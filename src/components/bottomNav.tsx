import { Link, useLocation } from "@tanstack/react-router";
import { Dumbbell, Home, User } from "lucide-react";

const routes = [
	{
		label: "Home",
		icon: Home,
		href: "/",
	},
	{
		label: "Workouts",
		icon: Dumbbell,
		href: "/workouts",
	},
	{
		label: "Profile",
		icon: User,
		href: "/profile",
	},
];

export function BottomNav() {
	const { pathname } = useLocation();

	return (
		<nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black">
			<div className="flex h-16">
				{routes.map((route) => (
					<Link
						key={route.href}
						to={route.href}
						className={`flex flex-1 flex-col items-center justify-center ${
							pathname === route.href
								? "bg-white/10 text-white"
								: "text-white/60 hover:bg-white/5 hover:text-white"
						}`}
					>
						<route.icon className="h-6 w-6" />
						<span className="mt-1 text-xs">{route.label}</span>
					</Link>
				))}
			</div>
		</nav>
	);
}
