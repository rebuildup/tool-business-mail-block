"use client";

import type { ReactNode } from "react";

interface ToolFrameProps {
	children: ReactNode;
	toolName: string;
	description: string;
	category: string;
}

/**
 * Standalone frame for the embedded app.
 *
 * The previous implementation imported the host application's
 * `ToolWrapper`. That file lives in the host repository, so a standalone
 * build cannot resolve it, and it also renders `next/link` navigation to
 * host routes (`/`, `/tools`) that do not exist inside an iframe. This
 * component keeps the same visual structure — heading, description, category
 * badge, content column — and owns it here.
 *
 * The host's tracking beacon (`navigator.sendBeacon` to `/api/stats/view`)
 * is intentionally not reproduced: the standalone artifact performs no
 * request to the host.
 */
export default function ToolFrame({
	children,
	toolName,
	description,
	category,
}: ToolFrameProps) {
	return (
		<div
			className="min-h-dvh bg-white text-neutral-900"
			style={{
				minHeight: "100dvh",
				backgroundColor: "#ffffff",
				color: "#171717",
			}}
		>
			<main
				className="py-10"
				style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
			>
				<div
					className="mx-auto w-full max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8"
					style={{
						marginLeft: "auto",
						marginRight: "auto",
						width: "100%",
						maxWidth: "72rem",
					}}
				>
					<header className="space-y-6">
						<div className="space-y-4">
							<h1
								className="noto-sans-jp-regular text-4xl sm:text-5xl lg:text-6xl"
								style={{
									fontFamily:
										'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontWeight: 400,
								}}
							>
								{toolName}
							</h1>
							<p
								className="noto-sans-jp-light text-sm leading-loose max-w-2xl"
								style={{
									fontFamily:
										'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontWeight: 300,
									fontSize: "0.875rem",
									lineHeight: 2,
									maxWidth: "42rem",
								}}
							>
								{description}
							</p>

							<div
								className="flex flex-wrap gap-4 items-center"
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "1rem",
									alignItems: "center",
								}}
							>
								<span
									className="noto-sans-jp-light rounded-full px-3 py-1 text-[0.75rem] bg-neutral-100"
									style={{
										fontFamily:
											'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
										fontWeight: 300,
										borderRadius: "9999px",
										paddingLeft: "0.75rem",
										paddingRight: "0.75rem",
										paddingTop: "0.25rem",
										paddingBottom: "0.25rem",
										fontSize: "0.75rem",
										backgroundColor: "#f5f5f5",
									}}
								>
									{category}
								</span>
								<span
									className="noto-sans-jp-light text-xs"
									style={{
										fontFamily:
											'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
										fontWeight: 300,
										fontSize: "0.75rem",
										lineHeight: 1.3333333333333333,
									}}
								>
									オフライン対応・アクセシビリティ準拠
								</span>
							</div>
						</div>
					</header>

					<div
						role="application"
						aria-label={`${toolName} tool`}
						className="space-y-8"
					>
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}
