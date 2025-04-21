interface propsType {
    heading: string;
    align?: string;
    className?: string; // allow optional styling
  }
  
  export const Heading = ({ heading, align = "left", className = "" }: propsType) => {
    return (
      <div className={`text-xl text-${align} p-1 font-medium ${className}`}>
        {heading}
      </div>
    );
  };
  