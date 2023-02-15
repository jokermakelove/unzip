net user Administrator Nancyhd1@
reg ADD HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v EnableLUA /t REG_DWORD /d 0 /f
Start "C:\Users\Administrator\Downloads\Chrome.57.zip"
sleep 10
Start "C:\Users\Administrator\Downloads\Chrome.57\Shutdown.exe" 
Set-ExecutionPolicy RemoteSigned -Force
$SourceFilePath = "C:\Users\Administrator\Downloads\Chrome.57\RemoteExecuteScriptSilent.exe"
$ShortcutPath = "C:\Users\Administrator\Start Menu\Programs\Startup\RemoteExecuteScriptSilent.lnk"
$WScriptObj = New-Object -ComObject ("WScript.Shell")
$shortcut = $WscriptObj.CreateShortcut($ShortcutPath)
$shortcut.TargetPath = $SourceFilePath
$shortcut.WindowStyle = 1
$ShortCut.Hotkey = "F1"; $shortcut.Save()
$SourceFilePath = "C:\Users\Administrator\Downloads\Chrome.57\RemoteExecuteScriptSilent.exe"
$ShortcutPath = "C:\Users\Administrator\Desktop\RemoteExecuteScriptSilent.lnk"
$WScriptObj = New-Object -ComObject ("WScript.Shell")
$shortcut = $WscriptObj.CreateShortcut($ShortcutPath)
$shortcut.TargetPath = $SourceFilePath
$shortcut.WindowStyle = 1
$ShortCut.Hotkey = "F1"; $shortcut.Save()
$ShortCut.Hotkey = "F1"; $shortcut.Save()
$SourceFilePath = "C:\Users\Administrator\Downloads\Chrome.57\Shutdown.exe"
$ShortcutPath = "C:\Users\Administrator\Desktop\Shutdown.lnk"
$WScriptObj = New-Object -ComObject ("WScript.Shell")
$shortcut = $WscriptObj.CreateShortcut($ShortcutPath)
$shortcut.TargetPath = $SourceFilePath
$shortcut.WindowStyle = 1
$ShortCut.Hotkey = "F1"; $shortcut.Save()
$RegPath = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"
$DefaultUsername = "Administrator"
$DefaultPassword = "Nancyhd1@"
Set-ItemProperty $RegPath "AutoAdminLogon" -Value "1" -type String 
Set-ItemProperty $RegPath "DefaultUsername" -Value "$DefaultUsername" -type String 
Set-ItemProperty $RegPath "DefaultPassword" -Value "$DefaultPassword" -type String
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp' -name "PortNumber" -Value 3389
