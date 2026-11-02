interface VariablesInputProps {
	allVariables: string[];
	variables: Record<string, string>;
	updateVariable: (key: string, value: string) => void;
}

export default function VariablesInput({
	allVariables,
	variables,
	updateVariable,
}: VariablesInputProps) {
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
				変数設定
			</h3>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
				style={{ display: "grid", gap: "1rem" }}
			>
				{allVariables.map((variable: string) => (
					<div key={variable} className="space-y-1">
						<label
							htmlFor={`var-${variable}`}
							className="text-sm noto-sans-jp-regular"
							style={{
								fontSize: "0.875rem",
								lineHeight: 1.4285714285714286,
								fontFamily:
									'"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
								fontWeight: 400,
							}}
						>
							{variable}
						</label>
						<input
							id={`var-${variable}`}
							type="text"
							value={variables[variable] || ""}
							onChange={(e) => updateVariable(variable, e.target.value)}
							placeholder={`${variable}を入力...`}
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
				))}
			</div>
		</div>
	);
}
