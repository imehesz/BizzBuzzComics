import React, { useState, useEffect, useRef } from 'react';
import './PanelViewer.scss';

const PanelViewer = ({ pages, initialPanelIndex = 0, closeFn }) => {
    const canvasRef = useRef(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(null);
    const [currentPanelIndex, setCurrentPanelIndex] = useState(initialPanelIndex);
    const [transition, setTransition] = useState({ from: null, to: null, progress: 1 });

    // Load page image
    const loadPage = (pageIndex) => {
        const image = new Image();
        image.src = pages[pageIndex].url;
        image.onload = () => {
            setCurrentPage(image);
        };
    };

    useEffect(() => {
        if (pages && pages.length > 0) {
            loadPage(currentPageIndex);
        }
    }, [currentPageIndex]);

    const animate = (fromPanel, toPanel) => {
        setTransition({
            from: fromPanel,
            to: toPanel,
            progress: 0
        });

        const startTime = performance.now();
        const duration = 200; // 500ms transition

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setTransition(prev => ({ ...prev, progress }));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const interpolateTransforms = (fromTransforms, toTransforms, progress) => {
        return {
            zoom: fromTransforms.zoom + (toTransforms.zoom - fromTransforms.zoom) * progress,
            offsetX: fromTransforms.offsetX + (toTransforms.offsetX - fromTransforms.offsetX) * progress,
            offsetY: fromTransforms.offsetY + (toTransforms.offsetY - fromTransforms.offsetY) * progress,
            minX: fromTransforms.minX + (toTransforms.minX - fromTransforms.minX) * progress,
            minY: fromTransforms.minY + (toTransforms.minY - fromTransforms.minY) * progress
        };
    };

    useEffect(() => {
        if (!currentPage || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const currentPolygon = pages[currentPageIndex].coordinates[currentPanelIndex];
        const transforms = calculateTransforms(currentPolygon, canvas.width, canvas.height);

        if (transition.progress < 1 && transition.from !== null) {
            const fromTransforms = calculateTransforms(transition.from, canvas.width, canvas.height);
            const toTransforms = calculateTransforms(transition.to, canvas.width, canvas.height);
            const interpolated = interpolateTransforms(fromTransforms, toTransforms, transition.progress);
            
            renderFrame(ctx, currentPage, transition.to, interpolated);
        } else {
            renderFrame(ctx, currentPage, currentPolygon, transforms);
        }
    }, [currentPage, currentPanelIndex, transition]);

    const nextPanel = () => {
        const currentPageCoordinates = pages[currentPageIndex].coordinates;
        
        if (currentPanelIndex < currentPageCoordinates.length - 1) {
            // Next panel on current page
            const fromPolygon = currentPageCoordinates[currentPanelIndex];
            const toPolygon = currentPageCoordinates[currentPanelIndex + 1];
            animate(fromPolygon, toPolygon);
            setCurrentPanelIndex(prev => prev + 1);
        } else if (currentPageIndex < pages.length - 1) {
            // Move to first panel of next page
            setCurrentPageIndex(prev => prev + 1);
            setCurrentPanelIndex(0);
        }
    };

    const prevPanel = () => {
        if (currentPanelIndex > 0) {
            // Previous panel on current page
            const fromPolygon = pages[currentPageIndex].coordinates[currentPanelIndex];
            const toPolygon = pages[currentPageIndex].coordinates[currentPanelIndex - 1];
            animate(fromPolygon, toPolygon);
            setCurrentPanelIndex(prev => prev - 1);
        } else if (currentPageIndex > 0) {
            // Move to last panel of previous page
            const prevPageIndex = currentPageIndex - 1;
            const lastPanelIndex = pages[prevPageIndex].coordinates.length - 1;
            setCurrentPageIndex(prevPageIndex);
            setCurrentPanelIndex(lastPanelIndex);
        }
    };

    const fullScreen = closeFn

    const isFirstPanel = currentPageIndex === 0 && currentPanelIndex === 0;
    const isLastPanel = currentPageIndex === pages.length - 1 && 
                       currentPanelIndex === pages[currentPageIndex].coordinates.length - 1;

    return (
        <div className="panel-viewer">
            <canvas ref={canvasRef} />

            <div 
                className="click-overlay left" 
                onClick={() => !isFirstPanel && prevPanel()}
            />
            
            <div 
                className="click-overlay right" 
                onClick={() => !isLastPanel && nextPanel()}
            />

            <div className="controls">
                <button class="btn-close" onClick={fullScreen}>
                    { isFirstPanel ? 'Tap left or right to navigate.' : '' }
                    { isLastPanel ? 'CLOSE' : '' }
                    { !isLastPanel && !isFirstPanel ? 'X' : '' }
                </button>
            </div>
        </div>
    );
};

export default PanelViewer;

const calculateTransforms = (polygon, canvasWidth, canvasHeight) => {
    const xs = polygon.map(point => point[0]);
    const ys = polygon.map(point => point[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const panelWidth = maxX - minX;
    const panelHeight = maxY - minY;

    const widthRatio = canvasWidth / panelWidth;
    const heightRatio = canvasHeight / panelHeight;
    const zoom = Math.min(widthRatio, heightRatio);

    // Calculate centering offsets
    const offsetX = (canvasWidth - (panelWidth * zoom)) / 2;
    const offsetY = (canvasHeight - (panelHeight * zoom)) / 2;

    return { zoom, offsetX, offsetY, minX, minY };
};

const renderFrame = (ctx, image, polygon, transforms) => {
    const { zoom, offsetX, offsetY, minX, minY } = transforms;
    
    // Clear canvas with black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.save();
    
    // Add blur effect
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 20;
    ctx.globalCompositeOperation = 'source-over';
    
    // Apply transforms
    ctx.translate(offsetX, offsetY);
    ctx.scale(zoom, zoom);
    ctx.translate(-minX, -minY);
    
    // Create mask path
    ctx.beginPath();
    ctx.moveTo(polygon[0][0], polygon[0][1]);
    polygon.slice(1).forEach(point => {
        ctx.lineTo(point[0], point[1]);
    });
    ctx.closePath();
    ctx.clip();
    
    // Draw the image
    ctx.drawImage(image, 0, 0);
    ctx.restore();
};