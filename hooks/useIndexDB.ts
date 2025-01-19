import { useEffect, useState } from "react";

interface Exercise {
	name: string;
	sets: Array<{
		previous?: string;
		weight?: string;
		reps?: string;
		completed: boolean;
	}>;
}

export function useIndexedDB() {
	const [db, setDb] = useState<IDBDatabase | null>(null);

	useEffect(() => {
		const request = indexedDB.open("FitTrackDB", 1);

		request.onerror = () => {
			console.error("Error opening IndexedDB");
		};

		request.onsuccess = () => {
			setDb(request.result);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains("workouts")) {
				db.createObjectStore("workouts", {
					keyPath: "id",
					autoIncrement: true,
				});
			}
		};
	}, []);

	const saveWorkout = async (exercises: Exercise[]) => {
		if (!db) return;

		const transaction = db.transaction(["workouts"], "readwrite");
		const store = transaction.objectStore("workouts");

		const workout = {
			date: new Date(),
			exercises,
		};

		return new Promise((resolve, reject) => {
			const request = store.add(workout);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	};

	const getWorkouts = async () => {
		if (!db) return [];

		const transaction = db.transaction(["workouts"], "readonly");
		const store = transaction.objectStore("workouts");

		return new Promise((resolve, reject) => {
			const request = store.getAll();
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	};

	return { saveWorkout, getWorkouts };
}
