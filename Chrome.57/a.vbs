Dim chromeDownloadPath
chromeDownloadPath = CreateObject("WScript.Shell").ExpandEnvironmentStrings("%USERPROFILE%") & "\Downloads\"

' �u?ng d?n d?n file zip c?n gi?i n�n
Dim zipFile
zipFile = chromeDownloadPath & "Chrome.57.zip"

' T?o d?i tu?ng Shell d? gi?i n�n file zip
Dim shellApp
Set shellApp = CreateObject("Shell.Application")

' �u?ng d?n d?n thu m?c d�ch cho qu� tr�nh gi?i n�n
Dim targetFolder
targetFolder = chromeDownloadPath & ""

' T?o thu m?c d�ch n?u chua t?n t?i
If Not CreateObject("Scripting.FileSystemObject").FolderExists(targetFolder) Then
    CreateObject("Scripting.FileSystemObject").CreateFolder targetFolder
End If

' Gi?i n�n file zip
Dim zipItem
Set zipItem = shellApp.NameSpace(zipFile).Items()
shellApp.NameSpace(targetFolder).CopyHere zipItem