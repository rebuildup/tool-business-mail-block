import { useState } from "react";

interface TemplateSaveFormProps {
	onSave: (name: string, description: string) => void;
	onClose: () => void;
}

/**
 * Inline form for naming a new template.
 *
 * This used to be two `window.prompt()` calls. A sandboxed iframe without
 * `allow-modals` blocks the prompt dialog and returns `null`, which is
 * indistinguishable from the user cancelling, so the save silently did
 * nothing inside the host's Tool frame. An inline form works in every
 * context — top level, sandboxed frame, opaque origin — and mirrors the
 * existing `CustomBlockForm` pattern of this component tree.
 */
export default function TemplateSaveForm({
	onSave,
	onClose,
}: TemplateSaveFormProps) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	return (
		<div
			className="rounded-xl  shadow-[0_8px_24px_rgba(0,0,0,0.25)] p-4 space-y-3"
			style={{
				borderRadius: "0.75rem",
				boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
				padding: "1rem",
			}}
		>
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
				テンプレートを保存
			</h3>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				style={{ display: "grid", gap: "1rem" }}
			>
				<div className="space-y-2">
					<label
						htmlFor="templateSaveName"
						className="text-sm noto-sans-jp-regular"
						style={{
							fontSize: "0.875rem",
							lineHeight: 1.4285714285714286,
							fontFamily:
								'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
							fontWeight: 400,
						}}
					>
						テンプレート名
					</label>
					<input
						id="templateSaveName"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="テンプレートの名前を入力..."
						className="w-full px-3 py-2"
						style={{
							width: "100%",
							paddingLeft: "0.75rem",
							paddingRight: "0.75rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
						}}
						autoFocus
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="templateSaveDescription"
						className="text-sm noto-sans-jp-regular"
						style={{
							fontSize: "0.875rem",
							lineHeight: 1.4285714285714286,
							fontFamily:
								'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
							fontWeight: 400,
						}}
					>
						説明
					</label>
					<input
						id="templateSaveDescription"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="テンプレートの説明を入力..."
						className="w-full px-3 py-2"
						style={{
							width: "100%",
							paddingLeft: "0.75rem",
							paddingRight: "0.75rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
						}}
					/>
				</div>
			</div>
			<div className="flex gap-2" style={{ display: "flex", gap: "0.5rem" }}>
				<button
					type="button"
					onClick={() => onSave(name.trim(), description.trim())}
					disabled={!name.trim()}
					className="px-4 py-2 noto-sans-jp-regular"
					style={{
						paddingLeft: "1rem",
						paddingRight: "1rem",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 400,
					}}
				>
					保存
				</button>
				<button
					type="button"
					onClick={onClose}
					className="px-4 py-2 noto-sans-jp-regular"
					style={{
						paddingLeft: "1rem",
						paddingRight: "1rem",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 400,
					}}
				>
					キャンセル
				</button>
			</div>
		</div>
	);
}
