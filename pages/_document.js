import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

	render() {
		return (
			<Html>
				<Head>
					<link href="https://fonts.googleapis.com/css?family=Roboto:400,600" rel="stylesheet" type="text/css"></link>
					<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.ico"></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}

}