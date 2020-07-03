export default `
	.themeCard {
		width: 33%;
		padding: 20px;
	}

	.themeCard img {
		width: 100%;
	}

	.themeCardInner {
		border: 1px solid #ccc;
		border-radius: 20px;
	    overflow: hidden;
	    text-align: center;
	    cursor: pointer;
	}

	.themeCardInner.active {
		border-color: blue;
	}

	.themeWrapper {
		display: flex;
		flex-wrap: wrap;
	}
	.domainText {
		margin-bottom: 20px;
	}
`;