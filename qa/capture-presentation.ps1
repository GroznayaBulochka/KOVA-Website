param(
 [ValidateSet('state','tap','document','dark-theme','confirm-demo-documents','type','back','scroll','capture')][string]$Action='state',
 [string]$Label,
 [string]$Text,
 [ValidateSet('text','content-desc')][string]$Attribute='text'
)
$ErrorActionPreference='Stop'
$appRoot='C:/Users/vlad2/Desktop/KOVA/KOVA-App'
. (Join-Path $appRoot 'scripts/offline-v1-normal-qualification-ui.ps1')
$qualificationSerial='emulator-5560'
$qualificationEvidence=Join-Path $PSScriptRoot 'artifacts/presentation-2026-10-21'
if($Label -notmatch '^[a-z0-9-]+$'){throw 'Unique capture label required'}
$avd=& $qualificationAdb -s $qualificationSerial emu avd name
if($LASTEXITCODE -ne 0 -or 'KOVA_Demo' -notin $avd){throw 'Only the dedicated synthetic emulator is permitted'}
switch($Action){
 'state' {Get-QualificationUi $Label}
 'tap' {Select-QualificationNode $Attribute $Text $Label}
 'document' {Select-QualificationScopedText $Text 'Read document' $Label}
 'dark-theme' {
  Get-QualificationUi ($Label+'-fresh') | Out-Null
  [xml]$tree=Get-Content (Join-Path $qualificationEvidence ($Label+'-fresh.xml')) -Raw
  if(@($tree.SelectNodes('//node') | Where-Object {$_.text -eq 'Tryb ciemny'}).Count -ne 1){throw 'Wrong theme screen'}
  $node=@($tree.SelectNodes('//node') | Where-Object {$_.checkable -eq 'true' -and $_.enabled -eq 'true'})
  if($node.Count -ne 1 -or $node[0].checked -ne 'false'){throw 'Theme must currently be light'}
  if($node[0].bounds -notmatch '^\[(\d+),(\d+)\]\[(\d+),(\d+)\]$'){throw 'Invalid bounds'}
  $x=[int](([int]$Matches[1]+[int]$Matches[3])/2);$y=[int](([int]$Matches[2]+[int]$Matches[4])/2)
  Invoke-QualificationAdb @('shell','input','tap',"$x","$y") $Label
 }
 'confirm-demo-documents' {
  Get-QualificationUi ($Label+'-fresh') | Out-Null
  [xml]$tree=Get-Content (Join-Path $qualificationEvidence ($Label+'-fresh.xml')) -Raw
  if(@($tree.SelectNodes('//node') | Where-Object {$_.text -eq 'Required confirmation'}).Count -ne 1){throw 'Wrong screen'}
  $checks=@($tree.SelectNodes('//node') | Where-Object {$_.class -eq 'android.widget.CheckBox' -and $_.enabled -eq 'true' -and $_.checked -eq 'false'})
  if($checks.Count -ne 2){throw 'Expected two read, unchecked demo documents'}
  $i=0
  foreach($node in $checks){
   if($node.bounds -notmatch '^\[(\d+),(\d+)\]\[(\d+),(\d+)\]$'){throw 'Invalid bounds'}
   $x=[int](([int]$Matches[1]+[int]$Matches[3])/2);$y=[int](([int]$Matches[2]+[int]$Matches[4])/2)
   Invoke-QualificationAdb @('shell','input','tap',"$x","$y") ($Label+'-'+($i++))
  }
 }
 'type' {if($Text -notmatch '^[a-zA-Z0-9 .,-]+$'){throw 'Only simple synthetic text allowed'}; Invoke-QualificationAdb @('shell','input','text',($Text -replace ' ','%s')) $Label}
 'back' {Invoke-QualificationAdb @('shell','input','keyevent','4') $Label}
 'scroll' {Invoke-QualificationAdb @('shell','input','swipe','540','1770','540','810','450') $Label}
 'capture' {
  Get-QualificationUi ($Label+'-ui')
  $file=Join-Path $qualificationEvidence ($Label+'.png')
  if(Test-Path -LiteralPath $file){throw 'Refusing to overwrite evidence'}
  $remote='/data/local/tmp/kova-presentation-'+[Guid]::NewGuid().ToString('N')+'.png'
  Invoke-QualificationAdb @('shell','screencap','-p',$remote) ($Label+'-capture')
  Invoke-QualificationAdb @('pull',$remote,$file) ($Label+'-pull-image')
  Invoke-QualificationAdb @('shell','rm',$remote) ($Label+'-remove-own-temp-image')
  Get-FileHash -Algorithm SHA256 -LiteralPath $file
 }
}
