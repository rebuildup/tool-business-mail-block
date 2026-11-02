import { CheckCircle } from "lucide-react";
import { EMAIL_GUIDELINES } from "./constants";

interface EmailGuidelinesProps {
	onClose: () => void;
}

export default function EmailGuidelines({ onClose }: EmailGuidelinesProps) {
	return (
		<div
			className="space-y-4 rounded-xl  shadow-[0_8px_24px_rgba(0,0,0,0.25)] p-4"
			style={{
				borderRadius: "0.75rem",
				boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
				padding: "1rem",
			}}
		>
			<div
				className="flex items-center justify-between"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<h2
					className="neue-haas-grotesk-display text-xl "
					style={{
						fontFamily:
							'"Helvetica Neue", "Arial Nova", "Hiragino Kaku Gothic ProN", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
						fontWeight: 700,
						fontSize: "1.25rem",
						lineHeight: 1.4,
					}}
				>
					プロフェッショナルメールガイドライン
				</h2>
				<button type="button" onClick={onClose} className="">
					×
				</button>
			</div>

			<div
				className="grid grid-cols-1 sm:grid-cols-3 gap-6"
				style={{ display: "grid", gap: "1.5rem" }}
			>
				<div className="space-y-3">
					<h3
						className="neue-haas-grotesk-display text-lg "
						style={{
							fontFamily:
								'"Helvetica Neue", "Arial Nova", "Hiragino Kaku Gothic ProN", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
							fontWeight: 700,
							fontSize: "1.125rem",
							lineHeight: 1.5555555555555556,
						}}
					>
						構造
					</h3>
					<ul className="space-y-1">
						{EMAIL_GUIDELINES.structure.map((item) => (
							<li
								key={`structure-${item}`}
								className="text-sm noto-sans-jp-light flex items-start gap-2"
								style={{
									fontSize: "0.875rem",
									lineHeight: 1.4285714285714286,
									fontFamily:
										'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontWeight: 300,
									display: "flex",
									alignItems: "flex-start",
									gap: "0.5rem",
								}}
							>
								<CheckCircle
									className="w-4 h-4  mt-0.5 shrink-0"
									style={{
										width: "1rem",
										height: "1rem",
										marginTop: "0.125rem",
										flexShrink: 0,
									}}
								/>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className="space-y-3">
					<h3
						className="neue-haas-grotesk-display text-lg "
						style={{
							fontFamily:
								'"Helvetica Neue", "Arial Nova", "Hiragino Kaku Gothic ProN", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
							fontWeight: 700,
							fontSize: "1.125rem",
							lineHeight: 1.5555555555555556,
						}}
					>
						トーン
					</h3>
					<ul className="space-y-1">
						{EMAIL_GUIDELINES.tone.map((item) => (
							<li
								key={`tone-${item}`}
								className="text-sm noto-sans-jp-light flex items-start gap-2"
								style={{
									fontSize: "0.875rem",
									lineHeight: 1.4285714285714286,
									fontFamily:
										'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontWeight: 300,
									display: "flex",
									alignItems: "flex-start",
									gap: "0.5rem",
								}}
							>
								<CheckCircle
									className="w-4 h-4  mt-0.5 shrink-0"
									style={{
										width: "1rem",
										height: "1rem",
										marginTop: "0.125rem",
										flexShrink: 0,
									}}
								/>
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className="space-y-3">
					<h3
						className="neue-haas-grotesk-display text-lg "
						style={{
							fontFamily:
								'"Helvetica Neue", "Arial Nova", "Hiragino Kaku Gothic ProN", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
							fontWeight: 700,
							fontSize: "1.125rem",
							lineHeight: 1.5555555555555556,
						}}
					>
						フォーマット
					</h3>
					<ul className="space-y-1">
						{EMAIL_GUIDELINES.formatting.map((item) => (
							<li
								key={`formatting-${item}`}
								className="text-sm noto-sans-jp-light flex items-start gap-2"
								style={{
									fontSize: "0.875rem",
									lineHeight: 1.4285714285714286,
									fontFamily:
										'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontWeight: 300,
									display: "flex",
									alignItems: "flex-start",
									gap: "0.5rem",
								}}
							>
								<CheckCircle
									className="w-4 h-4  mt-0.5 shrink-0"
									style={{
										width: "1rem",
										height: "1rem",
										marginTop: "0.125rem",
										flexShrink: 0,
									}}
								/>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
