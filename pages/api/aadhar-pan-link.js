// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const data = [
	["MNGPS6538G", "593761347384"],
	["ACMPN5670M", "339068541574"],
	["AAHPH3713Q", "481450876553"],
	["AAKPZ2724J", "211852756276"],
	["ATBPV0064D", "817880123751"],
];

const linkedCode = "EF40124";
const notLinkedCode = "EF40024";

const checkAadharPanLinkStatus = async (pan, aadhaarNumber) => {
	try {
		var myHeaders = new Headers();
		myHeaders.append(
			"Cookie",
			"693c4e2771754eedb1d75ba0debd40d8=804797a99a1fdd0741e997faff150931; 4a75cee7266fb5ae654dc5e51e6a9fe3=d350a98e3b1db9ef188ef129b89d19b4; a749e358a76a3d53091f791d882c558e=4e789da741d28f4eeb7703655fd0a9b7"
		);
		myHeaders.append("Host", "eportal.incometax.gov.in");
		myHeaders.append("Origin", "https://eportal.incometax.gov.in");
		myHeaders.append(
			"Referer",
			"https://eportal.incometax.gov.in/iec/foservices/"
		);
		myHeaders.append(
			"User-Agent",
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 sec-ch-ua: "Chromium";v="111", "Not(A:Brand";v="8"'
		);
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			aadhaarNumber,
			pan,
			preLoginFlag: "Y",
			serviceName: "linkAadhaarPreLoginService",
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		const response = await fetch(
			"https://eportal.incometax.gov.in/iec/servicesapi/getEntity",
			requestOptions
		);
		const result = await response.json();
		console.log(
			pan,
			aadhaarNumber,
			result.messages[0].desc
			// result.messages[0].code == linkedCode
		);
		return result.messages[0];
		// if(result.messages[0])
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export default async function handler(req, res) {
	try {
		const { aadhar, pan } = req.query;

		const data = await checkAadharPanLinkStatus(pan, aadhar);
		console.log(data);
		res.status(200).json({ msg: "There you go", data });
	} catch (err) {
		res.status(500).json({ msg: "Internal server error" });
	}
}
