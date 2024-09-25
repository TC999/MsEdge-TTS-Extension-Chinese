import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { FormControlLabel, IconButton, Link, Stack, Switch, Typography } from '@mui/material';
import { ArrowBackIosNew, GitHub } from '@mui/icons-material';
import CustomSlider from './CustomSlider';
import { useEffect, useState } from 'react';
import Mellowtel from 'mellowtel';
const CONFIGURATION_KEY = "YzQ3ODQ0Yjg=";

export default function TemporaryDrawer(props: any) {
    const { open, toggleDrawer, settings, handleSliderChange } = props;

    const mellowtel = new Mellowtel(atob(CONFIGURATION_KEY), {
        MAX_DAILY_RATE: 500,
    });

    const [isSupportDev, setIsSupportDev] = useState<boolean>(false);

    const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked) {
            await mellowtel.optIn();
            const started = await mellowtel.start();
            if(!started) {
                await mellowtel.optOut();
                setIsSupportDev(false);
            }
            else {
                setIsSupportDev(true);
            }
        }
        else {
            await mellowtel.optOut();
            setIsSupportDev(false);
        }
    };

    const DrawerContent = (
        <Box>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ m: 1 }}
                onClick={() => toggleDrawer(false)}
            >
                <ArrowBackIosNew />
            </IconButton>
                <Typography sx={{ position: 'fixed', top: '6%', left: '50%', transform: 'translate(-50%, -50%)' }} variant='h6'>设置</Typography>
            <Stack spacing={2} sx={{ mx: 2 }}>
                <CustomSlider value={settings.rate} labels={['慢', '默认', '快']} min={-50} max={50} defaultValue={0} label='速度' onChange={(e: any, value: number) => handleSliderChange(value, 'set_rate')} />
                <CustomSlider value={settings.pitch} labels={['低', '默认', '高']} min={-50} max={50} defaultValue={0} label='音阶' onChange={(e: any, value: number) => handleSliderChange(value, 'set_pitch')} />
            </Stack>
            <Divider sx={{ m: 2 }} />
            {
                import.meta.env.CHROME &&
                <>
                    <FormControlLabel sx={{ m: 1 }} control={<Switch checked={isSupportDev} onChange={handleSwitchChange} />} label="支持开发者 ☕" />
                    <Typography m={2}><Link href={browser.runtime.getURL('/options.html')} target="_blank">阅读更多</Link></Typography>
                    <Divider sx={{ m: 2 }} />
                </>

            }
            <Typography mx={2} >
                满意码 ?
                <br />
                ⭐ 投票 <Link
                    href={import.meta.env.CHROME ? 'https://chrome.google.com/webstore/detail/oajalfneblkfiejoadecnmodfpnaeblh' : 'https://addons.mozilla.org/en-US/firefox/addon/ms-edge-tts-text-to-speech/'}
                    target="_blank"
                >
                    {import.meta.env.CHROME ? 'Chrome Web Store' : 'Mozilla Addons'}
                </Link>
                <br /><br />
                还没有 ?
                <br />
                ✨ 功能请求 / 🐞 Bug 提交 :👉
                <IconButton
                    // sx={{ mx: 0 }}
                    size='small'
                    href='https://github.com/yacine-bens/MsEdge-TTS-Extension/issues/new/choose'
                    target='_blank'
                >
                    <GitHub />
                </IconButton>
            </Typography>
        </Box>
    );

    useEffect(() => {
        if (!import.meta.env.CHROME) return;
        (async () => {
            const permissions = await browser.permissions.getAll();
            if (!permissions.origins?.includes("https://*/*")) {
                return;
            }
            
            const hasOptedIn = await mellowtel.getOptInStatus();
            setIsSupportDev(hasOptedIn);
        })();
    }, []);

    return (
        <div>
            <Drawer
                open={open}
                onClose={() => toggleDrawer(false)}
                PaperProps={{
                    sx: { width: '100%' }
                }}
            >
                {DrawerContent}
            </Drawer>
        </div>
    );
}
