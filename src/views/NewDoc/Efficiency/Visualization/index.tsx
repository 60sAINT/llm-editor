import React, { useState } from "react";
import ChartType from "./ChartType";
import { NewComponent } from "./NewComponent";

const Visualization: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const handleIconClick = (component: string) => {
    setSelectedComponent(component);
  };

  const handleBackClick = () => {
    setSelectedComponent(null);
  };

  return (
    <div className="mt-3 mb-4">
      {selectedComponent ? (
        <NewComponent
          onBack={handleBackClick}
          componentName={selectedComponent}
        />
      ) : (
        <ChartType onClick={handleIconClick} />
      )}
    </div>
  );
};

export default Visualization;
