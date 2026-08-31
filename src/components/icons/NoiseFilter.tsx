/**
 * SVG filter to create noise effect
 * @returns NoiseFilter component
 */
const NoiseFilter = () => (
  <svg className="h-0 w-0">
    <filter id="noise">
      <feTurbulence id="turbulence">
        <animate
          attributeName="baseFrequency"
          dur="8s"
          values="0.9 0.9;0.8 0.8; 0.9 0.9"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" scale={60} />
    </filter>
  </svg>
);
export default NoiseFilter;
