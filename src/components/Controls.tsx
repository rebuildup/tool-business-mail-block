import {
	BookOpen,
	CheckCircle,
	FileText,
	Heart,
	Plus,
	Search,
} from "lucide-react";

interface ControlsProps {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	selectedCategory: string;
	setSelectedCategory: (value: string) => void;
	showFavoritesOnly: boolean;
	setShowFavoritesOnly: (value: boolean) => void;
	showTemplateLibrary: boolean;
	setShowTemplateLibrary: (value: boolean) => void;
	showValidation: boolean;
	setShowValidation: (value: boolean) => void;
	showGuidelines: boolean;
	setShowGuidelines: (value: boolean) => void;
	showCustomBlockForm: boolean;
	setShowCustomBlockForm: (value: boolean) => void;
}

export default function Controls({
	searchTerm,
	setSearchTerm,
	selectedCategory,
	setSelectedCategory,
	showFavoritesOnly,
	setShowFavoritesOnly,
	showTemplateLibrary,
	setShowTemplateLibrary,
	showValidation,
	setShowValidation,
	showGuidelines,
	setShowGuidelines,
	showCustomBlockForm,
	setShowCustomBlockForm,
}: ControlsProps) {
	return (
		<div className="space-y-4">
			<div
				className="flex flex-wrap gap-4 items-center"
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "1rem",
					alignItems: "center",
				}}
			>
				<div
					className="relative flex-1 min-w-64"
					style={{ position: "relative", flex: "1", minWidth: "16rem" }}
				>
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 "
						style={{
							position: "absolute",
							left: "0.75rem",
							top: "50%",
							transform: "translateY(-50%)",
							width: "1rem",
							height: "1rem",
						}}
					/>
					<input
						type="text"
						placeholder="ブロックを検索..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						aria-label="メールブロックを検索"
						className="w-full pl-10 pr-4 py-2"
						style={{
							width: "100%",
							paddingLeft: "2.5rem",
							paddingRight: "1rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
						}}
					/>
				</div>

				<select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					className="px-4 py-2"
					style={{
						paddingLeft: "1rem",
						paddingRight: "1rem",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
					}}
					aria-label="カテゴリで絞り込み"
				>
					<option value="all">全カテゴリ</option>
					<option value="greeting">挨拶</option>
					<option value="body">本文</option>
					<option value="closing">締め</option>
					<option value="signature">署名</option>
				</select>

				<button
					type="button"
					onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
					className={`px-4 py-2 flex items-center gap-2 noto-sans-jp-light ${showFavoritesOnly ? " " : " "}`}
					style={{
						paddingLeft: "1rem",
						paddingRight: "1rem",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 300,
					}}
				>
					<Heart
						className="w-4 h-4"
						style={{ width: "1rem", height: "1rem" }}
					/>
					お気に入りのみ
				</button>
			</div>

			<div
				className="flex flex-wrap gap-2"
				style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
			>
				<button
					type="button"
					onClick={() => setShowTemplateLibrary(!showTemplateLibrary)}
					className={`px-3 py-2 text-sm flex items-center gap-2 noto-sans-jp-light ${showTemplateLibrary ? " " : " "}`}
					style={{
						paddingLeft: "0.75rem",
						paddingRight: "0.75rem",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
						fontSize: "0.875rem",
						lineHeight: 1.4285714285714286,
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 300,
					}}
				>
					<FileText
						className="w-4 h-4"
						style={{ width: "1rem", height: "1rem" }}
					/>
					テンプレート
				</button>

				<button
					type="button"
					onClick={() => setShowValidation(!showValidation)}
					className={`px-3 py-2 text-sm flex items-center gap-2 noto-sans-jp-light ${showValidation ? " " : " "}`}
					style={{
						paddingLeft: "0.75rem",
						paddingRight: "0.75rem",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
						fontSize: "0.875rem",
						lineHeight: 1.4285714285714286,
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 300,
					}}
				>
					<CheckCircle
						className="w-4 h-4"
						style={{ width: "1rem", height: "1rem" }}
					/>
					バリデーション
				</button>

				<button
					type="button"
					onClick={() => setShowGuidelines(!showGuidelines)}
					className={`px-3 py-2 text-sm flex items-center gap-2 noto-sans-jp-light ${showGuidelines ? " " : " "}`}
					style={{
						paddingLeft: "0.75rem",
						paddingRight: "0.75rem",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
						fontSize: "0.875rem",
						lineHeight: 1.4285714285714286,
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 300,
					}}
				>
					<BookOpen
						className="w-4 h-4"
						style={{ width: "1rem", height: "1rem" }}
					/>
					ガイドライン
				</button>

				<button
					type="button"
					onClick={() => setShowCustomBlockForm(!showCustomBlockForm)}
					className={`px-3 py-2 text-sm flex items-center gap-2 noto-sans-jp-light ${showCustomBlockForm ? " " : " "}`}
					style={{
						paddingLeft: "0.75rem",
						paddingRight: "0.75rem",
						paddingTop: "0.5rem",
						paddingBottom: "0.5rem",
						fontSize: "0.875rem",
						lineHeight: 1.4285714285714286,
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
						fontFamily:
							'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontWeight: 300,
					}}
				>
					<Plus className="w-4 h-4" style={{ width: "1rem", height: "1rem" }} />
					カスタムブロック
				</button>
			</div>
		</div>
	);
}
