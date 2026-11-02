import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Trash2 } from "lucide-react";
import { CATEGORY_COLORS, CATEGORY_NAMES } from "./constants";
import type { ComposedBlock } from "./types";

interface ComposedBlocksProps {
	composedBlocks: ComposedBlock[];
	removeComposedBlock: (blockId: string) => void;
	resetComposedBlocks: () => void;
}

export default function ComposedBlocks({
	composedBlocks,
	removeComposedBlock,
	resetComposedBlocks,
}: ComposedBlocksProps) {
	return (
		<div className="space-y-4">
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
					メール作成エリア
				</h2>
				<button
					type="button"
					onClick={resetComposedBlocks}
					className="px-3 py-1 text-xs flex items-center gap-1 noto-sans-jp-light"
					style={{
						paddingLeft: "0.75rem",
						paddingRight: "0.75rem",
						paddingTop: "0.25rem",
						paddingBottom: "0.25rem",
						fontSize: "0.75rem",
						lineHeight: 1.3333333333333333,
						display: "flex",
						alignItems: "center",
						gap: "0.25rem",
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 300,
					}}
					title="全てリセット"
				>
					<Trash2
						className="w-4 h-4"
						style={{ width: "1rem", height: "1rem" }}
					/>
					リセット
				</button>
			</div>

			<Droppable droppableId="composed">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="space-y-3 min-h-96 max-h-96 overflow-y-auto rounded-xl  shadow-[0_8px_24px_rgba(0,0,0,0.25)] p-4"
						style={{
							minHeight: "24rem",
							maxHeight: "24rem",
							overflowY: "auto",
							borderRadius: "0.75rem",
							boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
							padding: "1rem",
						}}
					>
						{composedBlocks.length === 0 && (
							<div
								className="text-center  py-8"
								style={{
									textAlign: "center",
									paddingTop: "2rem",
									paddingBottom: "2rem",
								}}
							>
								<p
									className="noto-sans-jp-light"
									style={{
										fontFamily:
											'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
										fontWeight: 300,
									}}
								>
									ここにブロックをドラッグ&ドロップしてください
								</p>
							</div>
						)}

						{composedBlocks.map((block, index) => (
							<Draggable key={block.id} draggableId={block.id} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className={`p-3 rounded-lg hover:/20 transition-colors ${
											CATEGORY_COLORS[block.category]
										} ${snapshot.isDragging ? "" : ""}`}
										style={{
											padding: "0.75rem",
											borderRadius: "0.5rem",
											transitionProperty:
												"color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
											transitionDuration: "150ms",
											transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
										}}
									>
										<div
											className="flex items-start justify-between"
											style={{
												display: "flex",
												alignItems: "flex-start",
												justifyContent: "space-between",
											}}
										>
											<div className="flex-1" style={{ flex: "1" }}>
												<div
													className="flex items-center gap-2 mb-1"
													style={{
														display: "flex",
														alignItems: "center",
														gap: "0.5rem",
														marginBottom: "0.25rem",
													}}
												>
													<span
														className="text-xs rounded-lg px-2 py-1 noto-sans-jp-light"
														style={{
															fontSize: "0.75rem",
															lineHeight: 1.3333333333333333,
															borderRadius: "0.5rem",
															paddingLeft: "0.5rem",
															paddingRight: "0.5rem",
															paddingTop: "0.25rem",
															paddingBottom: "0.25rem",
															fontFamily:
																'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
															fontWeight: 300,
														}}
													>
														{CATEGORY_NAMES[block.category]}
													</span>
													<span
														className="text-sm noto-sans-jp-regular"
														style={{
															fontSize: "0.875rem",
															lineHeight: 1.4285714285714286,
															fontFamily:
																'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
															fontWeight: 400,
														}}
													>
														{block.title}
													</span>
												</div>
												<p
													className="text-xs noto-sans-jp-light leading-relaxed whitespace-pre-line"
													style={{
														fontSize: "0.75rem",
														lineHeight: 1.625,
														fontFamily:
															'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
														fontWeight: 300,
														whiteSpace: "pre-line",
													}}
												>
													{block.content}
												</p>
											</div>
											<button
												type="button"
												onClick={() => removeComposedBlock(block.id)}
												className="ml-2 p-1"
												style={{ marginLeft: "0.5rem", padding: "0.25rem" }}
												aria-label={`「${block.title}」を構成から削除`}
											>
												<Trash2
													className="w-4 h-4"
													style={{ width: "1rem", height: "1rem" }}
												/>
											</button>
										</div>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
}
