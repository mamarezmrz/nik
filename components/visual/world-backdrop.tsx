import MovingGrid from "./moving-grid";
import LightBeams from "./light-beams";
import ParticleField from "./particle-field";
export default function WorldBackdrop() { return <div className="world-backdrop" aria-hidden="true"><div className="world-aurora"/><MovingGrid/><ParticleField/><LightBeams/><div className="world-grain"/></div>; }
