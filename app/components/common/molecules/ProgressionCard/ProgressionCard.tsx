import React from 'react';
import defaultStyles from './ProgressionCard.css';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';

interface ProgressionCardProps {
  goal: number,
  progress: number,
  children?: React.ReactNode,
  wrapperStyles?: React.CSSProperties,
}

const ProgressionCard = ({ goal, progress, children, wrapperStyles }: ProgressionCardProps) => {
  const _goal = goal;
  const _progress = progress;
  const _percentage = (_progress / _goal) * 100;
  return (
    <div
      className={defaultStyles['wrapper']}
      style={{ ...wrapperStyles }}
    >
      <div className={defaultStyles['aspect-ratio-container']}>
        <div className={defaultStyles['content']}>
          <div className={defaultStyles['progress-circle-container']}>
            <CircularProgressbarWithChildren
              value={_percentage}
              styles={{
                path: {
                  stroke: "FEFEFE"
                },
                trail: {
                  stroke: "rgba(254, 254, 254, 0.4)"
                },
                text: {
                  fill: "FEFEFE"
                }
              }}
            >
              <div className={defaultStyles['progress-circle-children']}>
                <div className={defaultStyles['progress-circle-text']}>{_progress}/{_goal}</div>
                <div className={defaultStyles['progress-circle-subtext']}>min</div>
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div className={defaultStyles['right-element']}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressionCard;
