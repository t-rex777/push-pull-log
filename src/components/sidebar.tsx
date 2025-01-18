import { Link, useLocation } from "@tanstack/react-router";
import { BarChart2, Dumbbell, History, Home, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const routes = [
	{
		label: "Dashboard",
		icon: Home,
		href: "/",
	},
	{
		label: "Exercises",
		icon: Dumbbell,
		href: "/exercises",
	},
	{
		label: "History",
		icon: History,
		href: "/history",
	},
	{
		label: "Stats",
		icon: BarChart2,
		href: "/stats",
	},
];

export function Sidebar() {
	const { pathname } = useLocation();

	return (
		<>
			{/* Mobile Sidebar */}
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-6 w-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-64 p-0">
					<div className="flex h-full flex-col">
						<div className="p-6">
							<h1 className="text-2xl font-bold">FitTrack</h1>
						</div>
						<nav className="flex-1 space-y-1 px-3">
							{routes.map((route) => (
								<Link
									key={route.href}
									to={route.href}
									className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
										pathname === route.href
											? "bg-gray-100 text-gray-900"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									}`}
								>
									<route.icon className="mr-3 h-5 w-5" />
									{route.label}
								</Link>
							))}
						</nav>
						<div className="border-t p-4">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-gray-200" />
								<div>
									<p className="text-sm font-medium">User Name</p>
									<p className="text-xs text-gray-500">user@example.com</p>
								</div>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>

			{/* Desktop Sidebar */}
			<div className="hidden h-full w-64 flex-col border-r bg-white md:flex">
				<div className="p-6">
					<h1 className="text-2xl font-bold">FitTrack</h1>
				</div>
				<nav className="flex-1 space-y-1 px-3">
					{routes.map((route) => (
						<Link
							key={route.href}
							to={route.href}
							className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
								pathname === route.href
									? "bg-gray-100 text-gray-900"
									: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
							}`}
						>
							<route.icon className="mr-3 h-5 w-5" />
							{route.label}
						</Link>
					))}
				</nav>
				<div className="border-t p-4">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-full bg-gray-200" />
						<div>
							<p className="text-sm font-medium">User Name</p>
							<p className="text-xs text-gray-500">user@example.com</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
