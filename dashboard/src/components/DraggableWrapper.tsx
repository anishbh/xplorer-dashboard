import React, { useState } from "react";
import Draggable, { DraggableEvent, DraggableData} from "react-draggable";

interface DraggableWrapperProps {
    sensorId: string;
    children: React.ReactNode;
}

const DraggableWrapper = ({ sensorId, children }: DraggableWrapperProps) => {
      // Use state to store the actual DOM element
    const [node, setNode] = useState<HTMLDivElement | null>(null);
    // Create a ref object from that state
    const nodeRef = { current: node } as React.RefObject<HTMLDivElement>;
    const [position, setPosition] = useState<{ x: number, y: number }>(() => {
        const savedPosition = localStorage.getItem(`dragPosition_${sensorId}`);
        return savedPosition ? JSON.parse(savedPosition) : { x: 0, y: 0 };
    });
    
    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        console.log(`e: ${e}, data: ${data}`);
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        localStorage.setItem(`dragPosition_${sensorId}`, JSON.stringify(newPosition));
    }
    
    return (
        <Draggable
        nodeRef={nodeRef}
        position={position}
        onStop={handleStop}
        bounds="parent"
        >
        <div ref={nodeRef}>
            {children}
        </div>
        </Draggable>
    );
}

export default DraggableWrapper;