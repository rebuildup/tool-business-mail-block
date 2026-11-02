interface CustomBlockFormProps {
	customBlockContent: string;
	setCustomBlockContent: (value: string) => void;
	customBlockCategory: "greeting" | "body" | "closing" | "signature";
	setCustomBlockCategory: (
		value: "greeting" | "body" | "closing" | "signature",
	) => void;
	addCustomBlock: () => void;
	onClose: () => void;
}

export default function CustomBlockForm({
	customBlockContent,
	setCustomBlockContent,
	customBlockCategory,
	setCustomBlockCategory,
	addCustomBlock,
	onClose,
}: CustomBlockFormProps) {
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
				カスタムブロック作成
			</h3>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 gap-4"
				style={{ display: "grid", gap: "1rem" }}
			>
				<div className="space-y-2">
					<label
						htmlFor="customBlockCategory"
						className="text-sm noto-sans-jp-regular"
						style={{
							fontSize: "0.875rem",
							lineHeight: 1.4285714285714286,
							fontFamily:
								'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
							fontWeight: 400,
						}}
					>
						カテゴリ
					</label>
					<select
						id="customBlockCategory"
						value={customBlockCategory}
						onChange={(e) =>
							setCustomBlockCategory(
								e.target.value as "greeting" | "body" | "closing" | "signature",
							)
						}
						className="w-full px-3 py-2"
						style={{
							width: "100%",
							paddingLeft: "0.75rem",
							paddingRight: "0.75rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
						}}
					>
						<option value="greeting">挨拶</option>
						<option value="body">本文</option>
						<option value="closing">締め</option>
						<option value="signature">署名</option>
					</select>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="customBlockContent"
						className="text-sm noto-sans-jp-regular"
						style={{
							fontSize: "0.875rem",
							lineHeight: 1.4285714285714286,
							fontFamily:
								'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
							fontWeight: 400,
						}}
					>
						内容
					</label>
					<textarea
						id="customBlockContent"
						value={customBlockContent}
						onChange={(e) => setCustomBlockContent(e.target.value)}
						placeholder="ブロックの内容を入力... 変数は{変数名}で指定"
						className="w-full px-3 py-2 resize-none"
						style={{
							width: "100%",
							paddingLeft: "0.75rem",
							paddingRight: "0.75rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
							resize: "none",
						}}
						rows={3}
						aria-label="カスタムブロックの内容を入力"
					/>
				</div>
			</div>
			<div className="flex gap-2" style={{ display: "flex", gap: "0.5rem" }}>
				<button
					type="button"
					onClick={addCustomBlock}
					disabled={!customBlockContent.trim()}
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
					追加
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
