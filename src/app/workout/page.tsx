import WorkoutPage from "@/components/client-pages/workout";
import { api } from "@/trpc/server";
import { WorkoutAI } from "./action";

export default async function Page() {
  const currentWorkout = await api.workout.getCurrentWorkout();

  if (!currentWorkout) {
    return <div>No workout found</div>;
  }

  return (
    <WorkoutAI>
      <div className="w-full flex flex-col items-center h-full  grow">
        <WorkoutPage workoutId={currentWorkout.id} />
      </div>
    </WorkoutAI>
  );
}
