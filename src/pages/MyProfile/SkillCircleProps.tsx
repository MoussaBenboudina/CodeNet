import React from "react";
import styles from "@/styles/SkillCircle.module.scss";

interface SkillCircleProps {
  percentage: number; // Percentage of the circle that should be colored
  label: string; // Skill label
  problemSolved: string | number;
  allProblems: number; // Content to display in the center of the circle
  borderColor?: string; // Optional prop for custom border color
}

const SkillCircle: React.FC<SkillCircleProps> = ({
  percentage,
  label,
  problemSolved,
  allProblems,
  borderColor = "orange" // Default color if not specified
}) => {
  // Ensure percentage does not exceed 100
  const safePercentage = Math.min(percentage, 100);
  const filledDeg = safePercentage * 3.6; // Convert percentage to degrees

  return (
    <div className="flex flex-col items-center">
      <div className={styles.circleContainer}>
        <div className={styles.backgroundCircle}></div>
        <div
          className={styles.progressCircle}
          style={{
            borderColor: borderColor, // Use the borderColor prop
            maskImage: `conic-gradient(from 0deg at 50% 50%, black ${filledDeg}deg, transparent ${filledDeg}deg)`,
          }}
        ></div>
        <div className={styles.centerContent}>
          {problemSolved} <span className="text-[20px]">/</span>
          <span className="text-[14px] text-white mt-2">{allProblems}</span>
        </div>
      </div>
      <span className="text-sm mt-2">{label}</span>
    </div>
  );
};

export default SkillCircle;
