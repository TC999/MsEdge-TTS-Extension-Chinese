import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from '@mui/material';

export default function AlertDialog(props: any) {
	const { open, optIn, optOut } = props;

	return (
		<React.Fragment>
			<Dialog
				open={open}
			>
				<DialogTitle>新更新！</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ textAlign: 'justify'}}>
					✨ 我们很高兴地宣布推出暗色模式功能，以及一个新功能，它将帮助我们保持服务的免费和可用性。✨
						<br />
						<br />
						如果您选择继续并点击“支持开发者”，我们还将使用<Link href='https://docs.mellowtel.it/concepts/user-experience'  target='_blank'>Mellowtel API</Link>，以使受信任的合作伙伴能够通过您的网络节点路由部分流量来访问互联网资源。
						<br />
						如果您选择“不，谢谢”，我们不会使用所指示的额外用途。
						受信任的合作伙伴使用该服务不会影响您的浏览速度或质量。您可以随时从扩展程序设置中选择不参与。通过接受，您将帮助我们保持服务的免费和可用性。
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={optOut} variant='outlined' color='error' >不，谢谢</Button>
					<Button onClick={optIn} variant='contained' color='success' >支持开发者</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}