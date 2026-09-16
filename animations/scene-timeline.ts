import gsap from "gsap";
export const sceneWindows = { ignition: [0, .2], core: [.16, .42], transmission: [.38, .6], orbit: [.56, .84], resolution: [.8, 1] } as const;
export type SceneName = keyof typeof sceneWindows;
export function segmentProgress(progress: number, [start, end]: readonly [number, number]) { return gsap.utils.clamp(0, 1, (progress - start) / (end - start)); }
