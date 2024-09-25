import AlertDialog from "@/assets/components/AlertDialog";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import IosSwitch from "@/assets/components/IosSwitch";
import { storage } from "wxt/storage";
import Mellowtel from "mellowtel";
const CONFIGURATION_KEY = "YzQ3ODQ0Yjg=";

function App() {
	const mellowtel = new Mellowtel(atob(CONFIGURATION_KEY), {
		MAX_DAILY_RATE: 500,
	});

	const [dialogOpen, setDialogOpen] = useState(false);
	const [switchChecked, setSwitchChecked] = useState(false);

	const disclaimerShown = storage.defineItem<boolean>("local:disclaimerShown", { defaultValue: false });

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			handleOptIn();
		}
		else {
			handleOptOut();
		}
	};

	const handleOpen = () => {
		setDialogOpen(true);
	};

	const handleClose = () => {
		disclaimerShown.setValue(true);
		setDialogOpen(false);
	};

	const handleOptIn = async () => {
		await mellowtel.optIn();
		const started = await mellowtel.start();
		if (started) {
			setSwitchChecked(true);
			handleClose();
		}
		else {
			await mellowtel.optOut();
			setSwitchChecked(false);
		}
	};

	const handleOptOut = async () => {
		await mellowtel.optOut();

		setSwitchChecked(false);
		handleClose();
	};

	useEffect(() => {
		(async () => {
			const hasOptedIn = await mellowtel.getOptInStatus();
			setSwitchChecked(hasOptedIn);

			const disclaimerShownValue = await disclaimerShown.getValue();
			if (!disclaimerShownValue) {
				handleOpen();
			}
		})();
	}, []);

	return (
		<>
			<Box mx={18} my={2} px={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #ccc', borderRadius: '15px', '& > *': { padding: '10px' } }}>
				<Box sx={{ '& > *': { padding: '10px' } }}>
					<IosSwitch checked={switchChecked} onChange={handleSwitchChange} />
					<Typography variant="body2" textAlign={'justify'} sx={{ fontSize: 'large', lineHeight: '1.75rem' }} >
					    通过选择加入Mellowtel，您将支持您正在使用的扩展程序，并确保其背后的团队能够持续维护并改进产品。
						<br />
						Mellowtel是一个开源软件包，它帮助浏览器扩展创建者将其工作货币化。
						<br />
						该库允许您与受信任的人工智能实验室和初创公司共享未使用的互联网，他们用它来训练他们的模型。这个扩展程序的开发者会获得一小部分收入。
						<br />
						如果您改变主意，您可以随时选择退出。
						<br />
						Mellowtel仅共享您的带宽。安全性和隐私性100%有保障，该库是开源的，任何人都可以查看。它不会收集、共享或出售个人信息（即使是匿名数据）。
						<br />
						它也受到高度监管：我们持续与Chrome Web Store的监管者沟通，以确保提供安全的体验。Mellowtel向CWS监管者提供工具，以监控和执行合规性。
					</Typography>
				</Box>
			</Box>

			<AlertDialog onClose={handleClose} open={dialogOpen} optIn={handleOptIn} optOut={handleOptOut} />
		</>
	);
}

export default App;