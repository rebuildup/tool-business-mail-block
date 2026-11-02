import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Heart, Trash2 } from "lucide-react";
import { CATEGORY_COLORS, CATEGORY_NAMES } from "./constants";
import type { MailBlock } from "./types";

interface AvailableBlocksProps {
	filteredBlocks: MailBlock[];
	toggleFavorite: (blockId: string) => void;
	removeCustomBlock: (blockId: string) => void;
}

export default function AvailableBlocks({
	filteredBlocks,
	toggleFavorite,
	removeCustomBlock,
}: AvailableBlocksProps) {
	return (
		<div className="space-y-4">
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
				利用可能なブロック
			</h2>

			<Droppable droppableId="available" isDropDisabled={true}>
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
						{filteredBlocks.map((block, index) => (
							<Draggable key={block.id} draggableId={block.id} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className={`p-3 rounded-lg cursor-move hover:/20 transition-colors ${
											CATEGORY_COLORS[block.category]
										} ${snapshot.isDragging ? "" : ""}`}
										style={{
											padding: "0.75rem",
											borderRadius: "0.5rem",
											cursor: "move",
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
													{block.formality && (
														<span
															className={`text-xs px-2 py-1  ${
																block.formality === "formal"
																	? "  "
																	: block.formality === "casual"
																		? "  "
																		: "  "
															}`}
															style={{
																fontSize: "0.75rem",
																lineHeight: 1.3333333333333333,
																paddingLeft: "0.5rem",
																paddingRight: "0.5rem",
																paddingTop: "0.25rem",
																paddingBottom: "0.25rem",
															}}
														>
															{block.formality === "formal"
																? "敬語"
																: block.formality === "casual"
																	? "カジュアル"
																	: "中性"}
														</span>
													)}
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
												{block.tags && block.tags.length > 0 && (
													<div
														className="mt-1 flex flex-wrap gap-1"
														style={{
															marginTop: "0.25rem",
															display: "flex",
															flexWrap: "wrap",
															gap: "0.25rem",
														}}
													>
														{block.tags.map((tag, tagIndex) => (
															<span
																key={tagIndex}
																className="text-xs px-1 py-0.5    "
																style={{
																	fontSize: "0.75rem",
																	lineHeight: 1.3333333333333333,
																	paddingLeft: "0.25rem",
																	paddingRight: "0.25rem",
																	paddingTop: "0.125rem",
																	paddingBottom: "0.125rem",
																}}
															>
																#{tag}
															</span>
														))}
													</div>
												)}
												{block.variables && (
													<div
														className="mt-2 flex flex-wrap gap-1"
														style={{
															marginTop: "0.5rem",
															display: "flex",
															flexWrap: "wrap",
															gap: "0.25rem",
														}}
													>
														{block.variables.map((variable) => (
															<span
																key={variable}
																className="text-xs px-2 py-1    noto-sans-jp-light"
																style={{
																	fontSize: "0.75rem",
																	lineHeight: 1.3333333333333333,
																	paddingLeft: "0.5rem",
																	paddingRight: "0.5rem",
																	paddingTop: "0.25rem",
																	paddingBottom: "0.25rem",
																	fontFamily:
																		'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
																	fontWeight: 300,
																}}
															>
																{variable}
															</span>
														))}
													</div>
												)}
											</div>
											<div
												className="flex flex-col gap-1 ml-2"
												style={{
													display: "flex",
													flexDirection: "column",
													gap: "0.25rem",
													marginLeft: "0.5rem",
												}}
											>
												<button
													type="button"
													onClick={() => toggleFavorite(block.id)}
													className="p-1"
													style={{ padding: "0.25rem" }}
													aria-label={
														block.isFavorite
															? "お気に入りから削除"
															: "お気に入りに追加"
													}
												>
													<Heart
														className={`w-4 h-4 ${block.isFavorite ? "" : ""}`}
														style={{ width: "1rem", height: "1rem" }}
													/>
												</button>
												{block.isCustom && (
													<button
														type="button"
														onClick={() => removeCustomBlock(block.id)}
														className="p-1"
														style={{ padding: "0.25rem" }}
														aria-label="カスタムブロックを削除"
													>
														<Trash2
															className="w-4 h-4"
															style={{ width: "1rem", height: "1rem" }}
														/>
													</button>
												)}
											</div>
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
