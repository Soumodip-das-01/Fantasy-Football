"use client"
import BlurText from "@/components/BlurText";


const handleAnimationComplete = () => {
  console.log('Animation completed!');
};


export default function Home() {
  return (
    <>
        <div className="w-full h-3/4 flex items-center justify-center">
          <BlurText
            text="Welcome to Fantasy Football"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-5xl mb-8 text-white "
          />
        </div>
      
    </>
  );
}
