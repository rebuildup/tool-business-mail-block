import { Copy, Download, Save } from "lucide-react";

interface GeneratedEmailProps {
	generatedEmail: string;
	copyToClipboard: () => void;
	downloadEmail: () => void;
	saveAsTemplateFromUI: () => void;
	composedBlocksCount: number;
}

export default function GeneratedEmail({
	generatedEmail,
	copyToClipboard,
	downloadEmail,
	saveAsTemplateFromUI,
	composedBlocksCount,
}: GeneratedEmailProps) {
	return (
		<div className="space-y-4">
			<div
				className="flex items-center justify-between"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					// At 390px the heading plus three buttons do not fit on one
					// row: without wrapping, each button label broke one
					// character per line (「コ / ピ / ー」). Let the action group
					// move below the heading as whole buttons instead.
					flexWrap: "wrap",
					rowGap: "0.5rem",
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
					生成されたメール
				</h3>
				<div
					className="flex gap-2"
					style={{
						display: "flex",
						gap: "0.5rem",
						flexWrap: "wrap",
						rowGap: "0.5rem",
					}}
				>
					<button
						type="button"
						onClick={copyToClipboard}
						disabled={!generatedEmail}
						className="px-4 py-2 flex items-center gap-2 noto-sans-jp-regular"
						style={{
							paddingLeft: "1rem",
							paddingRight: "1rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
							display: "flex",
							alignItems: "center",
							gap: "0.5rem",
							whiteSpace: "nowrap",
							fontFamily:
								'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
							fontWeight: 400,
						}}
					>
						<Copy
							className="w-4 h-4"
							style={{ width: "1rem", height: "1rem" }}
						/>
						コピー
					</button>
					<button
						type="button"
						onClick={downloadEmail}
						disabled={!generatedEmail}
						className="px-4 py-2 flex items-center gap-2 noto-sans-jp-regular"
						style={{
							paddingLeft: "1rem",
							paddingRight: "1rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
							display: "flex",
							alignItems: "center",
							gap: "0.5rem",
							whiteSpace: "nowrap",
							fontFamily:
								'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
							fontWeight: 400,
						}}
					>
						<Download
							className="w-4 h-4"
							style={{ width: "1rem", height: "1rem" }}
						/>
						ダウンロード
					</button>
					<button
						type="button"
						onClick={saveAsTemplateFromUI}
						disabled={composedBlocksCount === 0}
						className="px-4 py-2 flex items-center gap-2 noto-sans-jp-regular"
						style={{
							paddingLeft: "1rem",
							paddingRight: "1rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
							display: "flex",
							alignItems: "center",
							gap: "0.5rem",
							whiteSpace: "nowrap",
							fontFamily:
								'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
							fontWeight: 400,
						}}
					>
						<Save
							className="w-4 h-4"
							style={{ width: "1rem", height: "1rem" }}
						/>
						テンプレート保存
					</button>
				</div>
			</div>

			<div
				className="rounded-xl  shadow-[0_8px_24px_rgba(0,0,0,0.25)] p-4 min-h-32"
				style={{
					borderRadius: "0.75rem",
					boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
					padding: "1rem",
					minHeight: "8rem",
				}}
			>
				<pre
					className="whitespace-pre-wrap text-sm noto-sans-jp-light leading-relaxed"
					style={{
						whiteSpace: "pre-wrap",
						fontSize: "0.875rem",
						lineHeight: 1.625,
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 300,
					}}
				>
					{generatedEmail || "メールブロックを追加してください..."}
				</pre>
			</div>
		</div>
	);
}
