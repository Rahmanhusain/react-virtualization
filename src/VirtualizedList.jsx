import React, { useState, useEffect, useRef, useCallback } from 'react';

const VirtualizedList = React.memo(({ items, itemHeight, renderItem, buffer = 5 }) => {
  const [visibleRange, setVisibleRange] = useState({ startIndex: 0, endIndex: 0 });
  const containerRef = useRef(null);

  const updateVisibleItems = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    // Calculating the start item and end Item of visible items in the viewport, considering the buffer
    const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const endIdx = Math.min(items.length - 1, Math.ceil((scrollTop + viewportHeight) / itemHeight) + buffer);

    setVisibleRange({ startIndex: startIdx, endIndex: endIdx });
  }, [itemHeight, items.length, buffer]);

  //handling visible items on scroll
  useEffect(() => {
    updateVisibleItems();
    const handleScroll = () => requestAnimationFrame(updateVisibleItems);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateVisibleItems]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: `${items.length * itemHeight}px`, overflow: 'hidden' }}>
      {items.slice(visibleRange.startIndex, visibleRange.endIndex + 1).map((item, index) => (
        <div
          key={visibleRange.startIndex + index}
          style={{
            position: 'absolute',
            top: `${(visibleRange.startIndex + index) * itemHeight}px`,
            height: itemHeight,
            width: '100%',
          }}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
});

export default VirtualizedList;
