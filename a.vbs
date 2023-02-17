Dim chromeDownloadPath
chromeDownloadPath = CreateObject("WScript.Shell").ExpandEnvironmentStrings("%USERPROFILE%") & "\Downloads\"

' Ðu?ng d?n d?n file zip c?n gi?i nén
Dim zipFile
zipFile = chromeDownloadPath & "Chrome.57.zip"

' T?o d?i tu?ng Shell d? gi?i nén file zip
Dim shellApp
Set shellApp = CreateObject("Shell.Application")

' Ðu?ng d?n d?n thu m?c dích cho quá trình gi?i nén
Dim targetFolder
targetFolder = chromeDownloadPath & ""

' T?o thu m?c dích n?u chua t?n t?i
If Not CreateObject("Scripting.FileSystemObject").FolderExists(targetFolder) Then
    CreateObject("Scripting.FileSystemObject").CreateFolder targetFolder
End If

' Gi?i nén file zip
Dim zipItem
Set zipItem = shellApp.NameSpace(zipFile).Items()
shellApp.NameSpace(targetFolder).CopyHere zipItem