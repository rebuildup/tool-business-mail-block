import { AlertCircle, CheckCircle } from "lucide-react";
import type { ValidationResult } from "./types";

interface EmailValidationProps {
	validationResult: ValidationResult;
}

export default function EmailValidation({
	validationResult,
}: EmailValidationProps) {
	return (
		<div className="space-y-4">
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
				メールバリデーション
			</h3>

			<div
				className="grid grid-cols-1 sm:grid-cols-3 gap-4"
				style={{ display: "grid", gap: "1rem" }}
			>
				{/* Errors */}
				{validationResult.errors.length > 0 && (
					<div className="   p-3" style={{ padding: "0.75rem" }}>
						<div
							className="flex items-center gap-2 mb-2"
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								marginBottom: "0.5rem",
							}}
						>
							<AlertCircle
								className="w-4 h-4 "
								style={{ width: "1rem", height: "1rem" }}
							/>
							<h4
								className="text-sm neue-haas-grotesk-display "
								style={{
									fontSize: "0.875rem",
									lineHeight: 1.4285714285714286,
									fontFamily:
										'"Helvetica Neue", "Arial Nova", "Hiragino Kaku Gothic ProN", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
									fontWeight: 700,
								}}
							>
								エラー ({validationResult.errors.length})
							</h4>
						</div>
						<ul className="space-y-1">
							{validationResult.errors.map((error) => (
								<li
									key={`error-${error}`}
									className="text-xs  noto-sans-jp-light"
									style={{
										fontSize: "0.75rem",
										lineHeight: 1.3333333333333333,
										fontFamily:
											'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
										fontWeight: 300,
									}}
								>
									• {error}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Warnings */}
				{validationResult.warnings.length > 0 && (
					<div className="   p-3" style={{ padding: "0.75rem" }}>
						<div
							className="flex items-center gap-2 mb-2"
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								marginBottom: "0.5rem",
							}}
						>
							<AlertCircle
								className="w-4 h-4 "
								style={{ width: "1rem", height: "1rem" }}
							/>
							<h4
								className="text-sm neue-haas-grotesk-display "
								style={{
									fontSize: "0.875rem",
									lineHeight: 1.4285714285714286,
									fontFamily:
										'"Helvetica Neue", "Arial Nova", "Hiragino Kaku Gothic ProN", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
									fontWeight: 700,
								}}
							>
								警告 ({validationResult.warnings.length})
							</h4>
						</div>
						<ul className="space-y-1">
							{validationResult.warnings.map((warning) => (
								<li
									key={`warning-${warning}`}
									className="text-xs  noto-sans-jp-light"
									style={{
										fontSize: "0.75rem",
										lineHeight: 1.3333333333333333,
										fontFamily:
											'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
										fontWeight: 300,
									}}
								>
									• {warning}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Suggestions */}
				{validationResult.suggestions.length > 0 && (
					<div className="   p-3" style={{ padding: "0.75rem" }}>
						<div
							className="flex items-center gap-2 mb-2"
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								marginBottom: "0.5rem",
							}}
						>
							<CheckCircle
								className="w-4 h-4 "
								style={{ width: "1rem", height: "1rem" }}
							/>
							<h4
								className="text-sm neue-haas-grotesk-display "
								style={{
									fontSize: "0.875rem",
									lineHeight: 1.4285714285714286,
									fontFamily:
										'"Helvetica Neue", "Arial Nova", "Hiragino Kaku Gothic ProN", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
									fontWeight: 700,
								}}
							>
								提案 ({validationResult.suggestions.length})
							</h4>
						</div>
						<ul className="space-y-1">
							{validationResult.suggestions.map((suggestion) => (
								<li
									key={`suggestion-${suggestion}`}
									className="text-xs  noto-sans-jp-light"
									style={{
										fontSize: "0.75rem",
										lineHeight: 1.3333333333333333,
										fontFamily:
											'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
										fontWeight: 300,
									}}
								>
									• {suggestion}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Success */}
				{validationResult.isValid &&
					validationResult.warnings.length === 0 &&
					validationResult.suggestions.length === 0 && (
						<div className="   p-3" style={{ padding: "0.75rem" }}>
							<div
								className="flex items-center gap-2"
								style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
							>
								<CheckCircle
									className="w-4 h-4 "
									style={{ width: "1rem", height: "1rem" }}
								/>
								<h4
									className="text-sm neue-haas-grotesk-display "
									style={{
										fontSize: "0.875rem",
										lineHeight: 1.4285714285714286,
										fontFamily:
											'"Helvetica Neue", "Arial Nova", "Hiragino Kaku Gothic ProN", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
										fontWeight: 700,
									}}
								>
									メールは適切に構成されています
								</h4>
							</div>
						</div>
					)}
			</div>
		</div>
	);
}
