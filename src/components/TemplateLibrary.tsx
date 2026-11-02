import { CATEGORY_NAMES } from "./constants";
import type { MailTemplate } from "./types";

interface TemplateLibraryProps {
	templates: MailTemplate[];
	selectedTemplate: string;
	loadTemplate: (templateId: string) => void;
	exportTemplate: (templateId: string) => void;
	deleteTemplate: (templateId: string) => void;
	onClose: () => void;
}

export default function TemplateLibrary({
	templates,
	selectedTemplate,
	loadTemplate,
	exportTemplate,
	deleteTemplate,
	onClose,
}: TemplateLibraryProps) {
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
					テンプレートライブラリ
				</h2>
				<button type="button" onClick={onClose} className="">
					×
				</button>
			</div>

			<div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
				style={{ display: "grid", gap: "1rem" }}
			>
				{templates.map((template) => (
					<div
						key={template.id}
						className={`rounded-lg p-3 hover:/20 transition-colors ${
							selectedTemplate === template.id ? " " : ""
						}`}
						style={{
							borderRadius: "0.5rem",
							padding: "0.75rem",
							transitionProperty:
								"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
							transitionDuration: "150ms",
							transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
						}}
					>
						<div className="space-y-2">
							<div
								className="flex items-start justify-between"
								style={{
									display: "flex",
									alignItems: "flex-start",
									justifyContent: "space-between",
								}}
							>
								<h3
									className="noto-sans-jp-regular text-sm"
									style={{
										fontFamily:
											'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
										fontWeight: 400,
										fontSize: "0.875rem",
										lineHeight: 1.4285714285714286,
									}}
								>
									{template.name}
								</h3>
								<div
									className="flex gap-1"
									style={{ display: "flex", gap: "0.25rem" }}
								>
									{template.isBuiltIn && (
										<span
											className="text-xs px-2 py-1    "
											style={{
												fontSize: "0.75rem",
												lineHeight: 1.3333333333333333,
												paddingLeft: "0.5rem",
												paddingRight: "0.5rem",
												paddingTop: "0.25rem",
												paddingBottom: "0.25rem",
											}}
										>
											内蔵
										</span>
									)}
								</div>
							</div>
							<p
								className="text-xs noto-sans-jp-light"
								style={{
									fontSize: "0.75rem",
									lineHeight: 1.3333333333333333,
									fontFamily:
										'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
									fontWeight: 300,
								}}
							>
								{template.description}
							</p>
							<div
								className="flex flex-wrap gap-1"
								style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
							>
								{template.blocks.map((block) => (
									<span
										key={`${template.id}-${block.id}`}
										className="text-xs px-2 py-1 rounded-lg"
										style={{
											fontSize: "0.75rem",
											lineHeight: 1.3333333333333333,
											paddingLeft: "0.5rem",
											paddingRight: "0.5rem",
											paddingTop: "0.25rem",
											paddingBottom: "0.25rem",
											borderRadius: "0.5rem",
										}}
									>
										{CATEGORY_NAMES[block.category]}
									</span>
								))}
							</div>
							<div
								className="flex gap-2 pt-2"
								style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem" }}
							>
								<button
									type="button"
									onClick={() => loadTemplate(template.id)}
									className="text-xs px-3 py-1"
									style={{
										fontSize: "0.75rem",
										lineHeight: 1.3333333333333333,
										paddingLeft: "0.75rem",
										paddingRight: "0.75rem",
										paddingTop: "0.25rem",
										paddingBottom: "0.25rem",
									}}
								>
									読み込み
								</button>
								<button
									type="button"
									onClick={() => exportTemplate(template.id)}
									className="text-xs px-3 py-1"
									style={{
										fontSize: "0.75rem",
										lineHeight: 1.3333333333333333,
										paddingLeft: "0.75rem",
										paddingRight: "0.75rem",
										paddingTop: "0.25rem",
										paddingBottom: "0.25rem",
									}}
								>
									エクスポート
								</button>
								{!template.isBuiltIn && (
									<button
										type="button"
										onClick={() => deleteTemplate(template.id)}
										className="text-xs px-3 py-1"
										style={{
											fontSize: "0.75rem",
											lineHeight: 1.3333333333333333,
											paddingLeft: "0.75rem",
											paddingRight: "0.75rem",
											paddingTop: "0.25rem",
											paddingBottom: "0.25rem",
										}}
									>
										削除
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
