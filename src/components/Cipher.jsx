import React from "react"


export const Cipher = () => {
	const [sourceText, setSourceText] = React.useState("")
	const [encryptedText, setEncryptedText] = React.useState("")
	const [shift, setShift] = React.useState(0)

	const uppercase = () =>
		[...Array(26)].map((n, i) => `${String.fromCharCode(i + "A".charCodeAt())}`);
	const lowercase = () =>
		[...Array(26)].map((n, i) => `${String.fromCharCode(i + "a".charCodeAt())}`);

	const mod = (a, b) => {
		const c = a % b;
		return c < 0 ? c + b : c;
	};

	const chiper = (array, shift) => {
		const cipher = {};
		array.forEach((value, index) => {
			cipher[value] = array[mod(index + shift, array.length)];
		});
		return cipher;
	};

	const caesarChipher = (shift) => {
		return {
			...chiper(uppercase(), shift),
			...chiper(lowercase(), shift),
		};
	};

	const processCharacter = (cipher, character) =>
		cipher.hasOwnProperty(character) ? cipher[character] : character;

	const encryptStr = (text, shift) => {
		const caesar = caesarChipher(shift);
		return [...text].map((c) => processCharacter(caesar, c)).join("");
	};

	return <div >
		<div style={{
			width: "300px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			background: "lightblue",
			padding: "15px",
			borderRadius: "5%"
		}}>
			<h1 style={{ textTransform: "uppercase", textAlign: "center" }}>Ceasar Cipher</h1>
			<div style={{
				display: "flex",
				flexDirection: "column",
				marginBottom: "10px"
			}}>
				<span>Enter text:</span>
				<input style={{
					borderColor: "#ebb7d5",
					borderRadius: "5px",
					backgroundColor: "lightblue"
				}} type="text" pattern="[a-zA-Z]*" onChange={e => {
					setSourceText(e.target.value)
				}} />
			</div>
			<div style={{
				display: "flex",
				flexDirection: "column",
				marginBottom: "10px"
			}}>
				<span>Enter shift:</span>
				<input style={{
					borderColor: "#ebb7d5",
					borderRadius: "5px",
					backgroundColor: "lightblue"
				}} type="number" onChange={e => {
					setShift(e.target.value)
				}} />
			</div>
			<div>
				<button onClick={e => {
					e.preventDefault()
					setEncryptedText(encryptStr(sourceText, shift))
				}} style={{
					borderColor: "#ebb7d5",
					borderRadius: "5px",
					backgroundColor: "lightblue"
				}}>Encrypt</button>
			</div>
			<div style={{
				display: "flex",
				flexDirection: "column"
			}}>
				<span>Encrypted text:</span>
				{
					encryptedText && <div>
						{encryptedText}
					</div>
				}
			</div>
		</div>
	</div>
}