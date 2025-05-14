## 模块一，生成daily sheet

```vba
Sub GenerateNewScheduleSheet(ByVal staffList As Variant)

    Dim sheetName As String
    sheetName = "排班_" & Format(Date, "dd")
    
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets(sheetName)
    On Error GoTo 0

    ' 如果已存在，选中；否则新建
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(After:=Sheets(Sheets.Count))
        ws.Name = sheetName
    Else
        ws.Activate
    End If

    Dim staffCount As Integer
    staffCount = UBound(staffList) - LBound(staffList) + 1

    Dim totalCols As Integer
    totalCols = 2 + 3 * staffCount

    ' 设置字体为微软雅黑加粗
    With ws.Cells.Font
        .Name = "微软雅黑"
        .Bold = True
    End With

    ' 设置前 x 列列宽为 7
    Dim col As Integer
    For col = 1 To totalCols
        ws.Columns(col).ColumnWidth = 7
    Next col

    ' 日期标题（A1:C1）
    With ws.Range("A1:C1")
        .Merge
        .Value = Format(Date, "yyyy-mm-dd")
        .Font.Size = 20
        .Font.Color = RGB(31, 56, 100)
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlCenter
        .RowHeight = 32
    End With

    ' 星期几（D1）
    With ws.Range("D1")
        .Formula = "=TEXT(A1,""dddd"")"
        .Font.Size = 11
        .Font.Color = RGB(31, 56, 100)
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlBottom
    End With

    ' 营业额工资余额（倒数第5列）
    ws.Cells(1, totalCols - 4).Formula = "=""营业额:""&C2&""      工资:""&D2&""      余额:""&C2-D2"
    ws.Cells(1, totalCols - 4).Font.Size = 11
    ws.Cells(1, totalCols - 4).Font.Color = RGB(31, 56, 100)
    ws.Cells(1, totalCols - 4).HorizontalAlignment = xlLeft
    ws.Cells(1, totalCols - 4).VerticalAlignment = xlBottom ' 底部对齐

    ' 第二行：隐藏工作小时统计
    ws.Rows(2).RowHeight = 25.8
    ws.Range("C2:D2").Font.Color = RGB(255, 255, 255) ' 白色字体隐藏
    
    Dim sumFormula As String
    Dim colLetter As String
    
    sumFormula = "SUM("
    
    For i = 0 To staffCount - 1
        colLetter = Split(ws.Cells(4, 4 + i * 3).Address(True, False), "$")(0)
        If i > 0 Then sumFormula = sumFormula & ","
        sumFormula = sumFormula & colLetter & "4"
    Next i
    
    sumFormula = sumFormula & ")"
    
    ws.Range("D2").Formula = "=" & sumFormula
    ws.Range("C2").Formula = "=" & sumFormula & "*2"

    ' 第三行：Time和人名
    ws.Range("A3").Value = "Time"
    ws.Range("A3").Font.Color = RGB(31, 56, 100)
    ws.Range("A3").HorizontalAlignment = xlRight
    ws.Rows(3).RowHeight = 22.7
    ws.Rows(3).Font.Size = 14

    Dim k As Integer, colIndex As Integer
    colIndex = 3
    For k = 0 To staffCount - 1
        With ws.Range(ws.Cells(3, colIndex), ws.Cells(3, colIndex + 1))
            .Merge
            .Value = staffList(k)
            .Font.Color = RGB(31, 56, 100)
            .HorizontalAlignment = xlCenter
        End With
        colIndex = colIndex + 3
    Next k

    ' 第四行：当日工作小时统计
    ws.Rows(4).RowHeight = 12.7
    ws.Rows(4).Font.Color = RGB(31, 56, 100)
    colIndex = 4
    For i = 0 To staffCount - 1
        ws.Cells(4, colIndex).Formula = "=SUM(" & Cells(6, colIndex).Address & ":" & Cells(69, colIndex).Address & ")*0.5"
        colIndex = colIndex + 3
    Next i

    ' 第五行下边双线边框
    With ws.Range(ws.Cells(4, 1), ws.Cells(4, totalCols)).Borders(xlEdgeBottom)
        .LineStyle = xlDouble
        .Color = RGB(31, 56, 100)
        .Weight = xlThick
    End With

    ' 第五行行高
    ws.Rows(5).RowHeight = 16.5

        ' 第六行到第69行（10:00~20:30，每10分钟）
    Dim r As Long
    Dim t As Date: t = TimeValue("10:00")
    For r = 6 To 69
        ws.Rows(r).RowHeight = 16
        ws.Cells(r, 1).Value = Format(t, "hh:mm")
        ws.Cells(r, 1).Font.Size = 10
        ws.Cells(r, 1).Font.Color = RGB(255, 255, 255)
        If Minute(t) = 0 Or Minute(t) = 30 Then
            ws.Cells(r, 1).Font.Color = RGB(31, 56, 100)
        End If
        t = DateAdd("n", 10, t)
    Next r

    ' ==== 画虚线部分开始 ====
    Dim colEnd As String
    colEnd = Split(ws.Cells(1, 3 + staffCount * 3).Address(True, False), "$")(0)

    ' 删除旧的虚线
    Dim shp As Shape
    For Each shp In ws.Shapes
        If Left(shp.Name, 5) = "Line_" Then
            shp.Delete
        End If
    Next shp

    Dim topPos As Double, leftPos As Double, rightPos As Double

    For r = 6 To 69 Step 3
        topPos = ws.Cells(r, "C").Top
        leftPos = ws.Cells(r, "C").Left
        rightPos = ws.Cells(r, colEnd).Left + ws.Cells(r, colEnd).Width

        Set shp = ws.Shapes.AddLine( _
            BeginX:=leftPos, BeginY:=topPos, _
            EndX:=rightPos, EndY:=topPos)

        With shp.Line
            .ForeColor.RGB = RGB(216, 216, 216)
            .Weight = 0.25
            .DashStyle = msoLineDash
        End With

        shp.Name = "Line_" & r
        shp.Placement = xlMove
    Next r
    ' ==== 画虚线部分结束 ====

    ' 冻结前四行
    ws.Activate
    ws.Range("A5").Select
    ActiveWindow.FreezePanes = True

End Sub



```

Call GenerateNewScheduleSheet(Array("Jason","David","Lee", "Steven", "Alisa"))

## 模块2，生成Order List，service list

```vba
' 负责主表单初始化以及整体控制的部分
Sub SetUpOrderSystem()
    Dim wb As Workbook: Set wb = ThisWorkbook
    Dim wsOrders As Worksheet, wsServices As Worksheet, wsLists As Worksheet
    Dim wsPayments As Worksheet, wsGiftCards As Worksheet
    Dim wsLogs As Worksheet, wsIndex As Worksheet

    ' 删除旧表
    Application.DisplayAlerts = False
    On Error Resume Next
    wb.Sheets("Orders").Delete
    wb.Sheets("Services").Delete
    wb.Sheets("Lists").Delete
    wb.Sheets("OrderPayments").Delete
    wb.Sheets("GiftCards").Delete
    wb.Sheets("Logs").Delete
     wb.Sheets("IndexStorage").Visible = xlSheetVisible
    wb.Sheets("IndexStorage").Delete
    Application.DisplayAlerts = True
    On Error GoTo 0

    ' 新建表
    Set wsOrders = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsOrders.Name = "Orders"
    Set wsServices = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsServices.Name = "Services"
    Set wsLists = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsLists.Name = "Lists"
    Set wsPayments = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsPayments.Name = "OrderPayments"
    Set wsGiftCards = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsGiftCards.Name = "GiftCards"
    Set wsLogs = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsLogs.Name = "Logs"
    Set wsIndex = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsIndex.Name = "IndexStorage"
    
    ' 设置 Services 表头
    SetUpServices wsServices
    ' 设置 Lists 表内容
    SetUpLists wsLists
    ' 设置命名区域
    SetUpNamedRanges wb, wsLists, wsServices
    ' 设置 Orders 表头及数据表
    SetUpOrdersTable wsOrders
    ' 设置 Payments 表格
    SetUpPayments wsPayments
    ' 设置 GiftCards 表格
    SetUpGiftCards wsGiftCards
    ' 设置Logs表格
    SetUpLogs wsLogs
    ' 设置 Index 表格
    SetUpIndexStorage wsIndex

    MsgBox "初始化完成！", vbInformation
End Sub


' 负责 Services 工作表的设置
Sub SetUpServices(ws As Worksheet)
    ws.Range("A1:D1").Value = Array("Service Name", "Duration", "Price", "Abbr.")
End Sub

' 负责 Lists 工作表的设置
Sub SetUpLists(ws As Worksheet)
    ws.Range("A1:A4").Value = Application.WorksheetFunction.Transpose(Array("Unspecified", "Male", "Female", "By Name"))
    ws.Range("B1:B5").Value = Application.WorksheetFunction.Transpose(Array("Jason", "David", "Lee", "Steven", "Alisa", "Kevin", "Rose"))
    ws.Range("C1:C4").Value = Application.WorksheetFunction.Transpose(Array("Booked", "Arrived", "Paid", "Cancelled"))
    ws.Range("D1:D6").Value = Application.WorksheetFunction.Transpose(Array("Cash", "Credit Card", "Zelle", "Venmo", "Apple Pay", "Gift Card"))
    ws.Range("E1:E3").Value = Application.WorksheetFunction.Transpose(Array("Active", "Used", "Expired"))
    ws.Range("F1:F5").Value = Application.WorksheetFunction.Transpose(Array("Add Order", "Update Order", "Add Payment", "Delete Payment", "Issue Gift Card"))
End Sub

' 设置动态命名区域
Sub SetUpNamedRanges(wb As Workbook, wsLists As Worksheet, wsServices As Worksheet)
    With wb.names
        .Add Name:="TechnicianReqList", RefersTo:="=Lists!$A$1:$A$" & wsLists.Cells(wsLists.Rows.Count, "A").End(xlUp).row
        .Add Name:="TechnicianList", RefersTo:="=Lists!$B$1:$B$" & wsLists.Cells(wsLists.Rows.Count, "B").End(xlUp).row
        .Add Name:="StatusList", RefersTo:="=Lists!$C$1:$C$" & wsLists.Cells(wsLists.Rows.Count, "C").End(xlUp).row
        .Add Name:="PaymentMethodList", RefersTo:="=Lists!$D$1:$D$" & wsLists.Cells(wsLists.Rows.Count, "D").End(xlUp).row
        .Add Name:="ProjectTypeList", RefersTo:="=Services!$A$2:$A$100"
        .Add Name:="CardStatusList", RefersTo:="=Lists!$E$1:$E$" & wsLists.Cells(wsLists.Rows.Count, "E").End(xlUp).row
        .Add Name:="OperationList", RefersTo:="=Lists!$F$1:$F$" & wsLists.Cells(wsLists.Rows.Count, "F").End(xlUp).row
    End With
End Sub

' 负责 Orders 表格的设置
Sub SetUpOrdersTable(ws As Worksheet)
    Dim headers As Variant
    headers = Array("Index", "Date", "Scheduled Time", "Start Time", "Service", "Technician Requirement", _
                    "Technician", "Phone Number", "Customer Name", "Status", "Payment Time", "Payment Method", "Payment Amount", "Comment")
    ws.Range("A1").Resize(1, UBound(headers) + 1).Value = headers

    ' 把 Orders 表格转换为 ListObject
    Dim tblOrder As ListObject
    Set tblOrder = ws.ListObjects.Add(xlSrcRange, ws.Range("A1:N2"), , xlYes)
    tblOrder.Name = "OrdersTable"
    tblOrder.TableStyle = ""

    ' 格式化列
    With tblOrder.DataBodyRange
        .Columns(2).NumberFormat = "yyyy-mm-dd" ' Date
        .Columns(3).NumberFormat = "hh:mm"      ' Scheduled Time
        .Columns(4).NumberFormat = "hh:mm"      ' Start Time
        .Columns(11).NumberFormat = "hh:mm"     ' Payment Time
        .Columns(8).NumberFormat = "@"          ' Phone
        .Interior.ColorIndex = xlColorIndexNone ' 设置背景为透明
        .Font.Color = RGB(0, 0, 0)              ' 字体颜色黑色
    End With

    ' 设置数据验证
    With ws
        .Range("OrdersTable[Service]").Validation.Add Type:=xlValidateList, Formula1:="=ProjectTypeList"
        .Range("OrdersTable[Technician Requirement]").Validation.Add Type:=xlValidateList, Formula1:="=TechnicianReqList"
        .Range("OrdersTable[Technician]").Validation.Add Type:=xlValidateList, Formula1:="=TechnicianList"
        .Range("OrdersTable[Status]").Validation.Add Type:=xlValidateList, Formula1:="=StatusList"
        .Range("OrdersTable[Payment Method]").Validation.Add Type:=xlValidateList, Formula1:="=PaymentMethodList"
    End With

    ' 冻结首行
    With ws
        .Activate
        .Range("A2").Select
        ActiveWindow.FreezePanes = True
    End With

    ' 表头样式：绿色背景白字
    With tblOrder.HeaderRowRange
        .Interior.Color = RGB(83, 120, 53)
        .Font.Color = RGB(255, 255, 255)
        .Font.Bold = True
    End With
End Sub

' 设置 OrderPayments 表格，支持软删除字段和创建/删除人信息
Sub SetUpPayments(ws As Worksheet)
    On Error Resume Next
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(After:=Sheets(Sheets.Count))
        ws.Name = "OrderPayments"
    Else
        ws.Cells.Clear
    End If
    On Error GoTo 0

    ' 添加表头
    Dim paymentHeaders As Variant
    paymentHeaders = Array("Payment ID", "Order ID", "Payment Method", "Amount", "Gift Card No", "Timestamp", "IsDeleted", "DeletedTime", "CreatedBy", "DeletedBy")
    ws.Range("A1:J1").Value = paymentHeaders

    ' 转为表格对象
    Dim tblPayments As ListObject
    Set tblPayments = ws.ListObjects.Add(xlSrcRange, ws.Range("A1:J2"), , xlYes)
    tblPayments.Name = "OrderPaymentsTable"
    tblPayments.TableStyle = ""

    ' 格式化列
    With tblPayments.DataBodyRange
        .Columns(4).NumberFormat = "#,##0.00"            ' Amount
        .Columns(6).NumberFormat = "yyyy-mm-dd hh:mm"    ' Timestamp
        .Columns(8).NumberFormat = "yyyy-mm-dd hh:mm"    ' DeletedTime
        .Font.Color = RGB(0, 0, 0)
        .Interior.ColorIndex = xlColorIndexNone
    End With

    ' 数据验证
    With ws
        .Range("OrderPaymentsTable[Payment Method]").Validation.Add Type:=xlValidateList, Formula1:="=PaymentMethodList"
    End With

    ' 表头样式
    With tblPayments.HeaderRowRange
        .Interior.Color = RGB(83, 120, 53)
        .Font.Color = RGB(255, 255, 255)
        .Font.Bold = True
    End With

    ' 冻结首行
    With ws
        .Activate
        .Range("A2").Select
        ActiveWindow.FreezePanes = True
    End With
End Sub


' 负责 GiftCards 表格的设置
Sub SetUpGiftCards(ws As Worksheet)
    On Error Resume Next
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(After:=Sheets(Sheets.Count))
        ws.Name = "GiftCards"
    Else
        ws.Cells.Clear
    End If
    On Error GoTo 0

    ' 添加表头
    Dim giftHeaders As Variant
    giftHeaders = Array("Gift Card No", "Balance", "Status", "Issued By", "Created Time", "Created By")
    ws.Range("A1:F1").Value = giftHeaders

    ' 转为表格对象
    Dim tblGiftCards As ListObject
    Set tblGiftCards = ws.ListObjects.Add(xlSrcRange, ws.Range("A1:F2"), , xlYes)
    tblGiftCards.Name = "GiftCardsTable"
    tblGiftCards.TableStyle = ""

    ' 格式化列
    With tblGiftCards.DataBodyRange
        .Columns(2).NumberFormat = "#,##0.00"            ' Balance
        .Columns(5).NumberFormat = "yyyy-mm-dd hh:mm"    ' Created Time
        .Font.Color = RGB(0, 0, 0)
        .Interior.ColorIndex = xlColorIndexNone
    End With

    ' 数据验证
    With ws
        .Range("GiftCardsTable[Status]").Validation.Add Type:=xlValidateList, Formula1:="=StatusList"
    End With

    ' 表头样式
    With tblGiftCards.HeaderRowRange
        .Interior.Color = RGB(83, 120, 53)
        .Font.Color = RGB(255, 255, 255)
        .Font.Bold = True
    End With

    ' 冻结首行
    With ws
        .Activate
        .Range("A2").Select
        ActiveWindow.FreezePanes = True
    End With
End Sub

' 设置日志表，用于记录操作日志
Sub SetUpLogs(ws As Worksheet)
    On Error Resume Next
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(After:=Sheets(Sheets.Count))
        ws.Name = "Logs"
    Else
        ws.Cells.Clear
    End If
    On Error GoTo 0

    ' 添加表头
    Dim logHeaders As Variant
    logHeaders = Array("Log ID", "Operation Type", "Target Table", "Target ID", "User", "Timestamp")
    ws.Range("A1:F1").Value = logHeaders

    ' 转为表格对象
    Dim tblLogs As ListObject
    Set tblLogs = ws.ListObjects.Add(xlSrcRange, ws.Range("A1:F2"), , xlYes)
    tblLogs.Name = "LogsTable"
    tblLogs.TableStyle = ""

    ' 格式化列
    With tblLogs.DataBodyRange
        .Columns(5).NumberFormat = "yyyy-mm-dd hh:mm:ss" ' Timestamp
        .Font.Color = RGB(0, 0, 0)
        .Interior.ColorIndex = xlColorIndexNone
    End With

    ' 表头样式
    With tblLogs.HeaderRowRange
        .Interior.Color = RGB(83, 120, 53)
        .Font.Color = RGB(255, 255, 255)
        .Font.Bold = True
    End With

    ' 冻结首行
    With ws
        .Activate
        .Range("A2").Select
        ActiveWindow.FreezePanes = True
    End With
End Sub

Sub SetUpIndexStorage(ws As Worksheet)
    ws.Visible = xlSheetVeryHidden ' 设置为非常隐藏
    ws.Cells(1, 1).Value = "SheetName"
    ws.Cells(1, 2).Value = "CurrentIndex"

    ' 指定需要初始化的工作表列表
    ' Dim sheetNames As Variant
    ' sheetNames = Array("Orders", "OrderPayments", "GiftCards", "Logs") ' 这里添加你需要初始化的工作表名
    
      ' 设置初始值
    ws.Cells(1, 1).Value = "Orders"
    ws.Cells(1, 2).Value = 0 ' Orders 初始 index

    ws.Cells(2, 1).Value = "OrderPayments"
    ws.Cells(2, 2).Value = 0 ' OrderPayments 初始 index

    ws.Cells(3, 1).Value = "GiftCards"
    ws.Cells(3, 2).Value = 0 ' GiftCards 初始 index

    ws.Cells(4, 1).Value = "Logs"
    ws.Cells(4, 2).Value = 0 ' Logs 初始 index

    MsgBox "指定工作表的 Index 已初始化！", vbInformation
End Sub

```

## Order表代码

```vba
Private Sub Worksheet_SelectionChange(ByVal Target As Range)
    Dim tbl As ListObject
    Set tbl = Me.ListObjects("OrdersTable")
    If tbl Is Nothing Then Exit Sub
    
    Dim lastDataRow As Long
    lastDataRow = tbl.DataBodyRange.row + tbl.DataBodyRange.Rows.Count - 1
    
    ' 如果选中了表格下面的区域，直接选回表格
    If Target.row > lastDataRow Then
        MsgBox "请不要在表格下方添加或选中内容，使用“提交”按钮新增订单。", vbExclamation
        Application.EnableEvents = False
        tbl.DataBodyRange.Cells(1, 1).Select
        Application.EnableEvents = True
    End If
End Sub


Private Sub Worksheet_Change(ByVal Target As Range)
    Dim tbl As ListObject
    On Error Resume Next
    Set tbl = Me.ListObjects("OrdersTable")
    On Error GoTo 0
    
    If tbl Is Nothing Then Exit Sub
    

    ' 获取数据体的最后一行
    Dim lastDataRow As Long
    lastDataRow = tbl.DataBodyRange.row + tbl.DataBodyRange.Rows.Count - 1

    ' 如果选中的单元格在表格下方
    If Target.row > lastDataRow Then
        If Target.CountLarge = 1 Then ' 只有单元格手动更改时才执行 Undo
            Application.EnableEvents = False
            Application.Undo
            MsgBox "请不要在表格下方添加或编辑内容，使用“提交”按钮新增订单。", vbExclamation
            Application.EnableEvents = True
            ' 返回选择首个数据单元格，避免留在表外
            tbl.DataBodyRange.Cells(1, 1).Select
        End If
    End If

    Dim statusCol As Long: statusCol = 10
    Dim paymentTimeCol As Long: paymentTimeCol = 11  ' 假设 Payment Time 在第11列
    Dim paymentAmountCol As Long: paymentAmountCol = 13 ' Payment Amount 在13列
    Dim arriveTimeCol As Long: arriveTimeCol = 4
    
    Dim rng As Range
    For Each rng In Target.Cells
        ' 如果更改的是 Status 列
        If Not Intersect(rng, tbl.DataBodyRange.Columns(statusCol)) Is Nothing Then
            ' 更新行样式
            Call UpdateOrderRowStyles
            
            ' 检查是否是 "Paid"
            If rng.Value = "Paid" Then
                ' 获取当前时间戳
                Dim currentTime As String
                currentTime = Now
                
                ' 获取对应的 Payment Time 单元格并填入时间戳
                Dim paymentTimeCell As Range
                Set paymentTimeCell = tbl.DataBodyRange.Cells(rng.row - tbl.DataBodyRange.row + 1, paymentTimeCol)
                Set paymentAmountCell = tbl.DataBodyRange.Cells(rng.row - tbl.DataBodyRange.row + 1, paymentAmountCol)
                
                
                paymentTimeCell.Value = currentTime
                paymentTimeCell.NumberFormat = "hh:mm:ss"  ' 格式化为时间
                ' 获取 Services 数据 找出付了多少钱
                Dim projectType As String: projectType = Cells(rng.row, 5).Value
                Dim price As Variant
                Dim wsServices As Worksheet: Set wsServices = ThisWorkbook.Sheets("Services")
                Dim i As Long
                For i = 2 To wsServices.Cells(wsServices.Rows.Count, 1).End(xlUp).row
                    If wsServices.Cells(i, 1).Value = projectType Then
                        price = wsServices.Cells(i, 3).Value
                        Exit For
                    End If
                Next i
                If price = 0 Then Exit Sub
                paymentAmountCell.Value = price
            ElseIf rng.Value = "Arrived" Then ' 如果将状态更改到arrive则自动填入来的时间
                ' 获取当前时间戳
                currentTime = Now
                Dim arriveTimeCell As Range
                Set arriveTimeCell = tbl.DataBodyRange.Cells(rng.row - tbl.DataBodyRange.row + 1, arriveTimeCol)
                arriveTimeCell.Value = currentTime
                arriveTimeCell.NumberFormat = "hh:mm:ss"  ' 格式化为时间
            End If
            Exit For
        End If
    Next rng
    
    ' 绘图
    
    If Not Intersect(Target, tbl.DataBodyRange) Is Nothing Then
        ' 保存 Target 供稍后使用
        Set g_Target = Target
        Debug.Print "赋值后: ", TypeName(g_Target)
    
        ' 取消前一次的延迟任务（如果有的话）
        On Error Resume Next
        Application.OnTime earliesttime:=g_nextTime, Procedure:="reDrawBlock", Schedule:=False
        On Error GoTo 0
    
        ' 安排新的延迟任务
        g_nextTime = Now + TimeValue("00:00:05")
        Application.OnTime earliesttime:=g_nextTime, Procedure:="reDrawBlock"
    End If
    Application.EnableEvents = True
End Sub





```

## Form 生成

```vba
Sub CreateSimpleOrderForm(anchorCell As Range)
    Dim ws As Worksheet: Set ws = anchorCell.Worksheet

    Dim labels As Variant, names As Variant
    labels = Array("预约时间", "项目类型", _
                   "技师要求", "技师", _
                   "电话号码", "客户姓名")
    names = Array("scheduledTime", "projectType", _
                  "technicianReq", "technician", _
                  "phone", "customerName")

    ' 设置布局：一行六列
    Dim positions(0 To 5, 1 To 2)
    Dim i As Integer
    For i = 0 To 5
        positions(i, 1) = 0
        positions(i, 2) = i
    Next i

    ' 设置卡片背景格式
    Dim cardRange As Range
    Set cardRange = ws.Range(anchorCell, anchorCell.Offset(1, 5))
    With cardRange
        .Font.Name = "微软雅黑"
        .Borders.LineStyle = xlContinuous
        .Borders.Color = RGB(255, 255, 255) ' 设置所有边框颜色为白色
        .Font.Size = 11
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlCenter
    End With

    ' 创建表单内容
    For i = 0 To UBound(labels)
        Dim rowOffset As Integer: rowOffset = positions(i, 1)
        Dim colOffset As Integer: colOffset = positions(i, 2)

        ' Label行
        With anchorCell.Offset(rowOffset, colOffset)
            .Value = labels(i)
            .Font.Bold = True
            .Interior.Color = RGB(37, 78, 120)
            .Font.Color = RGB(255, 255, 255)
        End With

        ' 输入框/下拉框
        With anchorCell.Offset(rowOffset + 1, colOffset)
            .Name = names(i)
            .ClearContents
            .Interior.Color = RGB(155, 194, 230)
            .Font.Color = RGB(31, 56, 100)
            .Validation.Delete

            Select Case names(i)
                Case "scheduledTime"
                    .NumberFormat = "hh:mm"
                Case "projectType"
                    ' 动态更新ProjectType的下拉列表
                    .Validation.Add Type:=xlValidateList, _
                        Formula1:="=OFFSET(Services!$A$2,0,0,COUNTA(Services!$A:$A)-1,1)"
                Case "technicianReq"
                    ' 动态更新TechnicianReq的下拉列表
                    .Validation.Add Type:=xlValidateList, Formula1:="=TechnicianReqList"
                Case "technician"
                    ' 动态更新Technician的下拉列表
                    .Validation.Add Type:=xlValidateList, Formula1:="=TechnicianList"
                Case "phone"
                    .NumberFormat = "@"
            End Select
        End With
    Next i
    
    ws.Columns(anchorCell.Offset(0, 4).Column).ColumnWidth = 13.25
    ws.Columns(anchorCell.Offset(0, 2).Column).ColumnWidth = 11
    
    ws.Columns(anchorCell.Offset(1, 1).Column).ColumnWidth = 14
    anchorCell.Offset(1, 1).HorizontalAlignment = xlLeft

    ' 提交按钮
    Dim btnSubmit As Shape
    Set btnSubmit = ws.Shapes.AddShape(msoShapeRoundedRectangle, anchorCell.Offset(2, 0).Left, anchorCell.Offset(2, 0).Top, 60, 22)
    With btnSubmit
        .Name = "btnSubmitOrder"
        .TextFrame2.TextRange.Text = "提交"
        .TextFrame2.TextRange.Font.Bold = msoTrue
        .TextFrame2.VerticalAnchor = msoAnchorMiddle
        .TextFrame2.TextRange.ParagraphFormat.Alignment = msoAlignCenter
        .TextFrame2.TextRange.Font.Fill.ForeColor.RGB = vbWhite
        .Fill.ForeColor.RGB = RGB(0, 130, 59)
        .Line.Visible = msoFalse  ' 去掉边框
        .OnAction = "SubmitOrderForm"
    End With
    
    ' 清空按钮
    Dim btnClear As Shape
    Set btnClear = ws.Shapes.AddShape(msoShapeRoundedRectangle, anchorCell.Offset(2, 2).Left, anchorCell.Offset(2, 2).Top, 60, 22)
    With btnClear
        .Name = "btnClearOrder"
        .TextFrame2.TextRange.Text = "清空"
        .TextFrame2.TextRange.Font.Bold = msoTrue
        .TextFrame2.VerticalAnchor = msoAnchorMiddle
        .TextFrame2.TextRange.ParagraphFormat.Alignment = msoAlignCenter
        .TextFrame2.TextRange.Font.Fill.ForeColor.RGB = vbWhite
        .Fill.ForeColor.RGB = RGB(255, 0, 0)
        .Line.Visible = msoFalse  ' 去掉边框
        .OnAction = "ClearOrderForm"
    End With

    ' 绑定 Worksheet_Change 自动格式化电话号码
    Call AttachPhoneFormatter(ws)

    ' 创建命名区域
    Dim wb As Workbook: Set wb = ThisWorkbook
    Dim wsServices As Worksheet: Set wsServices = wb.Sheets("Services")
    
    ' 动态更新命名区域
    With wb.names
        ' 更新Services表中的项目类型
        .Add Name:="TechnicianReqList", RefersTo:="=Lists!$A$1:$A$" & wsServices.Cells(wsServices.Rows.Count, "A").End(xlUp).Row
        .Add Name:="TechnicianList", RefersTo:="=Lists!$B$1:$B$" & wsServices.Cells(wsServices.Rows.Count, "B").End(xlUp).Row
    End With

    MsgBox "表单创建完成，并且下拉列表已经动态更新！", vbInformation
End Sub


Sub AttachPhoneFormatter(ws As Worksheet)
    Dim moduleCode As String
    moduleCode = _
    "Private Sub Worksheet_Change(ByVal Target As Range)" & vbCrLf & _
    "    If Not Intersect(Target, Me.Range(""phone"")) Is Nothing Then" & vbCrLf & _
    "        Application.EnableEvents = False" & vbCrLf & _
    "        Dim raw As String: raw = Target.Value" & vbCrLf & _
    "        Dim digitsOnly As String, c As String, i As Integer: digitsOnly = """"" & vbCrLf & _
    "        For i = 1 To Len(raw)" & vbCrLf & _
    "            c = Mid(raw, i, 1)" & vbCrLf & _
    "            If c Like ""#"" Then digitsOnly = digitsOnly & c" & vbCrLf & _
    "        Next i" & vbCrLf & _
    "        If Len(digitsOnly) = 10 Then" & vbCrLf & _
    "            Target.Value = ""("" & Mid(digitsOnly, 1, 3) & "") "" & Mid(digitsOnly, 4, 3) & ""-"" & Mid(digitsOnly, 7, 4)" & vbCrLf & _
    "        End If" & vbCrLf & _
    "        Application.EnableEvents = True" & vbCrLf & _
    "    End If" & vbCrLf & _
    "End Sub"

    ' 写入事件代码
    With ThisWorkbook.VBProject.VBComponents(ws.CodeName).CodeModule
        .DeleteLines 1, .CountOfLines
        .InsertLines 1, moduleCode
    End With
End Sub


```

## Submit Order

```vba
Sub SubmitOrderForm()
    Dim ws As Worksheet
    Set ws = ActiveSheet  ' 当前表单页

    ' 获取 Orders 表
    Dim ordersSheet As Worksheet
    Dim tbl As ListObject

    On Error Resume Next
    Set ordersSheet = ThisWorkbook.Sheets("Orders")
    On Error GoTo 0

    If ordersSheet Is Nothing Then
        MsgBox "未找到 Orders 工作表！", vbExclamation
        Exit Sub
    End If

    ' 获取 ListObject 表格
    On Error Resume Next
    Set tbl = ordersSheet.ListObjects("OrdersTable")
    On Error GoTo 0

    If tbl Is Nothing Then
        MsgBox "未找到 Orders 表格！请确保名称为 OrdersTable。", vbExclamation
        Exit Sub
    End If

    ' 获取表单输入数据
    Dim scheduledTime As Variant: scheduledTime = ws.Range("scheduledTime").Value
    Dim projectType As String: projectType = ws.Range("projectType").Value
    Dim technicianReq As String: technicianReq = ws.Range("technicianReq").Value
    Dim technician As String: technician = ws.Range("technician").Value
    Dim phone As String: phone = ws.Range("phone").Value
    Dim customerName As String: customerName = ws.Range("customerName").Value
    Dim formDate As Variant: formDate = ws.Range("A1").Value

    ' 数据验证

    ' 验证时间是否为空
    If IsEmpty(scheduledTime) Or scheduledTime = "" Then
        MsgBox "请填写预约时间！", vbExclamation
        Exit Sub
    End If

    ' 验证项目名称是否为空
    If IsEmpty(projectType) Or projectType = "" Then
        MsgBox "请填写项目名称！", vbExclamation
        Exit Sub
    End If

    ' 验证电话号码格式（如果有电话号码，则进行验证）
    If phone <> "" Then
        If Not IsPhoneNumberValid(phone) Then
            MsgBox "电话号码格式无效！请输入有效的电话号码。", vbExclamation
            Exit Sub
        End If
    End If

    ' 添加新行
    Dim newRow As ListRow
    Set newRow = tbl.ListRows.Add

    With newRow
        .Range(1, 1).Value = tbl.ListRows.Count  ' Index
        .Range(1, 2).Value = formDate            ' Date from A1 of active sheet
        .Range(1, 3).Value = scheduledTime       ' Scheduled Time
        .Range(1, 4).Value = ""                  ' Start Time
        .Range(1, 5).Value = projectType         ' Project Type
        .Range(1, 6).Value = technicianReq       ' Technician Requirement
        .Range(1, 7).Value = technician          ' Technician
        .Range(1, 8).Value = phone               ' Phone Number
        .Range(1, 9).Value = customerName        ' Customer Name
        .Range(1, 10).Value = ""            ' Status
        .Range(1, 11).Value = ""                 ' Payment Time
        .Range(1, 12).Value = ""                 ' Payment Method
        .Range(1, 13).Value = ""                 ' Payment Amount
    End With

    MsgBox "订单已提交！", vbInformation
End Sub

' 验证电话号码格式（例如：美国电话号码）
Function IsPhoneNumberValid(phone As String) As Boolean
    ' 简单的电话号码格式验证，允许带有括号、短横线、空格
    Dim phoneRegex As Object
    Set phoneRegex = CreateObject("VBScript.RegExp")
    
    phoneRegex.IgnoreCase = True
    phoneRegex.Global = True
    phoneRegex.Pattern = "^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"  ' 可匹配如 (123) 456-7890 或 123-456-7890 格式
    
    IsPhoneNumberValid = phoneRegex.Test(phone)
End Function
```

## UpdateOrderRowStyle

```vba
Sub UpdateOrderRowStyles()
    Dim tbl As ListObject
    Set tbl = ThisWorkbook.Sheets("Orders").ListObjects("OrdersTable")

    Dim i As Long
    For i = 1 To tbl.ListRows.Count
        Dim statusCell As Range
        Set statusCell = tbl.ListRows(i).Range.Columns(10)
        
        Dim rowRange As Range
        Set rowRange = tbl.ListRows(i).Range
        
        Dim status As String
        status = Trim(statusCell.Value)
        
        If status = "" Then
            rowRange.Interior.Color = RGB(226, 239, 218)
            rowRange.Font.Color = RGB(83, 120, 53)
        ElseIf LCase(status) = "arrived" Then
            rowRange.Interior.Color = RGB(255, 199, 206)
            rowRange.Font.Color = RGB(156, 0, 6)
        ElseIf LCase(status) = "cancelled" Then
            rowRange.Interior.Color = RGB(217, 217, 217)
            rowRange.Font.Color = RGB(127, 127, 127)
        Else
            rowRange.Interior.Color = RGB(255, 255, 255)
            rowRange.Font.Color = RGB(0, 0, 0)
        End If
    Next i
End Sub
```

## ResetOrderForm

```vba
Sub ClearOrderForm()
    Dim ws As Worksheet
    Set ws = ActiveSheet  ' 当前表单页

     ' 清空各个输入框的内容
    ws.Range("scheduledTime").Value = ""
    ws.Range("projectType").Value = ""
    ws.Range("technicianReq").Value = ""
    ws.Range("technician").Value = ""
    ws.Range("phone").Value = ""
    ws.Range("customerName").Value = ""
    
    MsgBox "表单已清空！", vbInformation
End Sub
```

## Technical sheet code

```vba
' 用于监听 Technicians 表格的修改
Private Sub Worksheet_Change(ByVal Target As Range)
    Dim wsTechnicians As Worksheet
    Set wsTechnicians = ThisWorkbook.Sheets("Technicians")
    Dim wsLeaveLog As Worksheet
    Set wsLeaveLog = ThisWorkbook.Sheets("LeaveLog")

    ' 如果修改的是 Weekly Rest Days 或 Status
    If Not Intersect(Target, wsTechnicians.Range("B2:B6, C2:C6")) Is Nothing Then
        Dim row As Long
        row = Target.row
        
        ' 获取 Weekly Rest Days 和 Status
        Dim restDays As String
        restDays = wsTechnicians.Cells(row, 2).Value
        Dim today As String
        today = Format(Now, "ddd") ' 获取今天的星期缩写（例如 Mon, Tue）

        ' 检查今天是否是 Weekly Rest Day
        If InStr(1, restDays, today) > 0 Then
            wsTechnicians.Cells(row, 3).Value = "On Leave"
            wsTechnicians.Cells(row, 4).Value = "Rest Day"
        Else
            wsTechnicians.Cells(row, 3).Value = "On Duty"
            wsTechnicians.Cells(row, 4).Value = "" ' 清空备注
        End If
        
        ' 检查 LeaveLog，判断今天是否在某个特殊休假期间
        Dim leaveStart As Date, leaveEnd As Date
        Dim leaveReason As String
        Dim isOnLeave As Boolean
        isOnLeave = False

        For Each cell In wsLeaveLog.Range("A2:A" & wsLeaveLog.Cells(wsLeaveLog.Rows.Count, 1).End(xlUp).row)
            If cell.Value = wsTechnicians.Cells(row, 1).Value Then ' 如果 Name 匹配
                leaveStart = cell.Offset(0, 1).Value
                leaveEnd = cell.Offset(0, 2).Value

                ' 如果今天在假期内，设置为 On Leave
                If Date >= leaveStart And Date <= leaveEnd Then
                    wsTechnicians.Cells(row, 3).Value = "On Leave"
                    wsTechnicians.Cells(row, 4).Value = cell.Offset(0, 3).Value ' 假期理由
                    isOnLeave = True
                    Exit For ' 找到假期后跳出循环
                End If
            End If
        Next cell
        
        ' 如果不在假期内，且没有是休息日，也设置为 On Duty
        If Not isOnLeave And wsTechnicians.Cells(row, 3).Value <> "On Leave" Then
            wsTechnicians.Cells(row, 3).Value = "On Duty"
            wsTechnicians.Cells(row, 4).Value = "" ' 清空备注
        End If
    End If
End Sub
```

## Setup Technician Table

```vba
' 用于弹窗前记录目标单元格
Public targetCell As Range

Public Sub SetUpTechnicianTables()
    Dim wb As Workbook: Set wb = ThisWorkbook
    Dim wsTechnicians As Worksheet, wsLeaveLog As Worksheet

    ' 删除旧表
    Application.DisplayAlerts = False
    On Error Resume Next
    wb.Sheets("Technicians").Delete
    wb.Sheets("LeaveLog").Delete
    On Error GoTo 0
    Application.DisplayAlerts = True

    ' 新建表
    Set wsTechnicians = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsTechnicians.Name = "Technicians"
    Set wsLeaveLog = wb.Sheets.Add(After:=wb.Sheets(wb.Sheets.Count)): wsLeaveLog.Name = "LeaveLog"

    ' 设置 Technicians 表头
    With wsTechnicians
        .Range("A1:D1").Value = Array("Name", "Weekly Rest Days", "Status", "Remarks")
        .Range("A2:A6").Value = Application.WorksheetFunction.Transpose(Array("Jason", "David", "Lee", "Amy", "Cindy"))
        .Range("B2:B6").Value = Application.WorksheetFunction.Transpose(Array("Mon,Wed,Fri", "Tue,Thu", "Thu,Sat", "Mon,Fri", "Sun,Sat"))
        .Range("C2:C6").Value = Application.WorksheetFunction.Transpose(Array("On Duty", "On Leave", "On Leave", "On Duty", "On Duty"))
        .Range("D2:D6").Value = Application.WorksheetFunction.Transpose(Array("", "Cold", "Family Emergency", "", ""))
    End With

    ' 设置 LeaveLog 表头和内容
    With wsLeaveLog
        .Range("A1:D1").Value = Array("Name", "Start Date", "End Date", "Leave Reason")
        .Range("A2:A4").Value = Application.WorksheetFunction.Transpose(Array("Jason", "Lee", "Lee"))
        .Range("B2:B4").Value = Application.WorksheetFunction.Transpose(Array("2025-04-25", "2025-04-26", "2025-05-01"))
        .Range("C2:C4").Value = Application.WorksheetFunction.Transpose(Array("2025-04-25", "2025-04-26", "2025-05-01"))
        .Range("D2:D4").Value = Application.WorksheetFunction.Transpose(Array("Personal", "Family Emergency", "Family Emergency"))
        .Columns("B:C").NumberFormat = "yyyy-mm-dd"
        .Range("D2:D4").Validation.Add Type:=xlValidateList, Formula1:="Personal,Family Emergency,Illness"
    End With

    ' Technicians 表数据验证
    With wsTechnicians
        .Range("B2:B6").Validation.Delete
        .Range("C2:C6").Validation.Delete

        With .Range("C2:C6").Validation
            .Add Type:=xlValidateList, Formula1:="On Duty,On Leave"
            .IgnoreBlank = True
            .ShowInput = True
            .ShowError = True
        End With
    End With

    ' 设置表头样式
    With wsTechnicians.Range("A1:D1")
        .Font.Color = RGB(255, 255, 255) ' 背景颜色
        .Interior.Color = RGB(128, 96, 0) ' 字体颜色
        .Font.Bold = True
    End With

    With wsLeaveLog.Range("A1:D1")
        .Font.Color = RGB(255, 255, 255) ' 背景颜色
        .Interior.Color = RGB(128, 96, 0) ' 字体颜色
        .Font.Bold = True
    End With

    ' 设置全局目标变量为空
    Set targetCell = Nothing

    MsgBox "Technicians 和 LeaveLog 表格已创建，双击休息日单元格可弹出多选窗口！", vbInformation
End Sub

' 用于弹窗前记录目标单元格
Public Sub LaunchPickerForCell(ByVal Target As Range)
    ' 在这里初始化 targetCell 变量
    Set targetCell = Target
    ShowWeekPicker
End Sub

Public Sub ShowWeekPicker()
    ' 确保 targetCell 已正确赋值
    If Not targetCell Is Nothing Then
        WeekPicker.SetTargetCell targetCell
        WeekPicker.Show
    End If
End Sub


```





请你根据我order表里的东西，按照我之前说的，最后每增加一行，就把这一行画我的那些表格上，具体怎么画呢，首先，根据项目时长来定，三十分钟占三行，六十分钟六行，九十分钟9行，然后这些都要占两列。然后看那个技师是谁，是谁就画在谁的下面（就是你知道你要找C3D3， F3G3，I3J3等等里面的值来判断画在哪两列下，然后看左边的时间，十点第六行，一行十分钟，一直到69行也就是晚上八点半。然后看预约的时间是几点，向下取整，然后放到对应的格子里。具体就是这些块，不需要合并起来，只是要加上背景颜色（如果要求那一列是不指定，背景颜色是rgb(0, 130 59)，这一块的第一行bg使用rgb(0, 84, 38)；如果是其他选项背bg色就是rgb(255,190, 0), 第一行bg就是rgb(128, 96, 0)，取消这些行我之前代码里画的线。然后每个块内，左上角填入客人名字，如果有，右上角填入项目价格（只有当状态变成付过钱的状态后，才能自动填入价格），然后这些行的中间行的第一列，填入电话号码（如果有），最后右下角的格子填入项目的缩写，比如FullBody对应Body， xxxCombo对应Combo，等等。最后，如果这个项目的状态是开始了，我们把当前的块的bg改改（第一行深粉色，剩余行粉色）。然后所有的block里的字体都是白色的。 你看，如果不这样搞的话还可以你直接在那些格子上化成图案给它覆盖上也行。你自己看什么合适

给我写出来代码，并且技师的顺序是不知道的。还有就是，不仅如此，order表每次更新，都要重新绘制这个dailysheet，就是从order表的日期判断获取哪个dailysheet，daily sheet的名字是”排班_日“，比如选定的日期是29号，那表名就是排班_29。order表的哪一行更新，或者当新增数据的时候，就根据它的日期去哪个表里重新绘制。

我的order表的结构: Index	Date	Scheduled Time	Start Time	Project Type	Technician Requirement	Technician	Phone Number	Customer Name	Status	Payment Time	Payment Method	Payment Amount
并且，那个duration是根据project type，去Services表里面找的，我的services表是这样的 项目名	时长（分钟）	价格	缩写。第二列是时长。



```vba
    Dim rowNum As Variant
    For Each rowNum In rowDict.Keys
        If rowNum >= tbl.DataBodyRange.row And rowNum < tbl.DataBodyRange.row + tbl.DataBodyRange.Rows.Count Then
            Call DrawBlock(rowNum)
        End If
    Next rowNum
```

## DrawBlock

```vba
Public Sub reDrawBlock()
 ' ? 统一触发绘图（包括新增/修改）
    Dim rowDict As Object: Set rowDict = CreateObject("Scripting.Dictionary")
    Dim targetDate As Date
    ' targetDate = Target.Worksheet.Cells(Target.row, 2).Value
    
    Debug.Print "g_Target: " & g_Target
    Debug.Print "g_Target.Address: " & g_Target.Address
    Debug.Print "g_Target.Row: " & g_Target.row
    Debug.Print "g_Target.Column: " & g_Target.Column
    ' Debug.Print "g_Target.Value: " & Target.Value
    
    Dim targetRow As Long
    targetRow = g_Target.row
    targetDate = g_Target.Worksheet.Cells(targetRow, 2).Value ' 假设日期在第二列
    
    Debug.Print targetDate
    
    Dim tbl As ListObject
    On Error Resume Next
    Set tbl = ThisWorkbook.Sheets("Orders").ListObjects("OrdersTable")
    On Error GoTo 0
    
    If tbl Is Nothing Then Exit Sub
    
    Dim tblRow As Range
    For Each tblRow In tbl.DataBodyRange.Rows
        If tblRow.Cells(1, 2).Value = targetDate And LCase(Trim(Cells(tblRow.row, 10).Value)) <> "cancelled" Then ' 第二列是日期
            If Not rowDict.exists(tblRow.row) Then
                rowDict.Add tblRow.row, True
                Debug.Print "row added: " & " " & tblRow.row & " " & LCase(Trim(Cells(tblRow.row, 10).Value)) & " " & tblRow.Cells(1, 2).Value
            End If
        End If
    Next tblRow
    
    Call ClearBlocks(targetDate)
    
    Dim rowNum As Variant
    For Each rowNum In rowDict.Keys
        ' 确保 rowNum 在表格范围内
        If rowNum >= tbl.DataBodyRange.row And rowNum < tbl.DataBodyRange.row + tbl.DataBodyRange.Rows.Count Then
            Call DrawBlock(rowNum)
            Debug.Print "row drawed: " & rowNum & LCase(Trim(Cells(rowNum, 10).Value))
        End If
    Next rowNum

End Sub


Sub ClearBlocks(ByVal targetDate As Date)
    Dim wsDaily As Worksheet
    Dim startCol As Long
    Dim endCol As Long
    Dim appointmentTimeCol As Long
    Dim targetRange As Range
    Dim currentRow As Long
    Dim col As Long
    
    ' 获取工作表，假设是排班表（"排班_日期"）
    Set wsDaily = ThisWorkbook.Sheets("排班_" & Day(targetDate))
    
    Debug.Print "Day(targetDate) = " & Day(targetDate)
    
    ' 找到预约时间所在的列
    appointmentTimeCol = 0 ' 初始化列号
    For col = 1 To wsDaily.Columns.Count
        If wsDaily.Cells(1, col).Value = "预约时间" Then ' 假设 "预约时间" 在第3行
            appointmentTimeCol = col
            Exit For
        End If
    Next col
    
    If appointmentTimeCol = 0 Then
        MsgBox "找不到预约时间列！", vbExclamation
        Exit Sub
    End If
    
    ' 计算清除范围的结束列（预约时间列 - 2）
    endCol = appointmentTimeCol - 2
    
    ' 构建目标范围，从C6到目标结束列，行范围是6到69
    Set targetRange = wsDaily.Range(wsDaily.Cells(6, 3), wsDaily.Cells(69, endCol))
    
    ' 清除内容和背景颜色
    targetRange.Clear ' 清除内容、背景颜色和格式
End Sub

Sub DrawBlock(ByVal row As Long)
    Debug.Print "Start to draw: " & row
    Dim wsOrder As Worksheet: Set wsOrder = ThisWorkbook.Sheets("Orders")
    Dim orderDate As Variant: orderDate = wsOrder.Cells(row, 2).Value
    Dim scheduledTime As Variant: scheduledTime = wsOrder.Cells(row, 3).Value
    If IsEmpty(orderDate) Or IsEmpty(scheduledTime) Then Exit Sub

    Dim sheetName As String: sheetName = "排班_" & Day(orderDate)
    Dim wsDaily As Worksheet
    On Error Resume Next
    Set wsDaily = ThisWorkbook.Sheets(sheetName)
    On Error GoTo 0
    If wsDaily Is Nothing Then Exit Sub
    
    Debug.Print "排班_" & Day(orderDate)

    ' 获取 Services 数据
    Dim projectType As String: projectType = wsOrder.Cells(row, 5).Value
    Dim duration As Long, shortName As String, price As Variant
    Dim wsServices As Worksheet: Set wsServices = ThisWorkbook.Sheets("Services")

    Dim i As Long
    For i = 2 To wsServices.Cells(wsServices.Rows.Count, 1).End(xlUp).row
        If wsServices.Cells(i, 1).Value = projectType Then
            duration = wsServices.Cells(i, 2).Value
            price = wsServices.Cells(i, 3).Value
            shortName = wsServices.Cells(i, 4).Value
            Exit For
        End If
    Next i
    If duration = 0 Then Exit Sub

    Dim blockHeight As Long: blockHeight = (duration + 9) \ 10

    ' 计算起始行
    Dim scheduledHour As Long: scheduledHour = Hour(scheduledTime)
    Dim scheduledMinute As Long: scheduledMinute = Minute(scheduledTime)
    Dim startRow As Long: startRow = ((scheduledHour - 10) * 60 + scheduledMinute) \ 10 + 6
    
    Debug.Print row & " " & startRow & " " & blockHeight

    ' 找技师在哪两列
    Dim techName As String: techName = wsOrder.Cells(row, 7).Value
    Dim col1 As Long, col2 As Long, found As Boolean
    For i = 3 To wsDaily.Cells(3, wsDaily.Columns.Count).End(xlToLeft).Column Step 3
        If wsDaily.Cells(3, i).Value = techName Then
            col1 = i: col2 = i + 1
            found = True
            Exit For
        End If
    Next i
    If Not found Then
        MsgBox "未找到匹配项！", vbExclamation
        Exit Sub
    End If

    Debug.Print col1 & " " & col2
    ' 画块
    Dim j As Long, cellBlock As Range
    Dim status As String: status = wsOrder.Cells(row, 10).Value
    Dim isUnspecified As Boolean: isUnspecified = (wsOrder.Cells(row, 6).Value = "Unspecified")

    For j = 0 To blockHeight - 1
        Set cellBlock = wsDaily.Range(wsDaily.Cells(startRow + j, col1), wsDaily.Cells(startRow + j, col2))
        With cellBlock
            .Font.Color = vbWhite
            .Font.Bold = True
            .Font.Name = "微软雅黑"
            .Borders.LineStyle = xlNone

            If status = "Arrived" Then
                If j = 0 Then .Interior.Color = RGB(182, 106, 108) Else .Interior.Color = RGB(255, 182, 193)
            ElseIf status = "Paid" Then
                If j = 0 Then .Interior.Color = RGB(58, 56, 56) Else .Interior.Color = RGB(117, 113, 113)
            ElseIf isUnspecified Then
                If j = 0 Then .Interior.Color = RGB(0, 84, 38) Else .Interior.Color = RGB(0, 130, 59)
            Else
                If j = 0 Then .Interior.Color = RGB(128, 96, 0) Else .Interior.Color = RGB(255, 190, 0)
            End If

            If j = 0 Then
                .Cells(1, 1).Value = wsOrder.Cells(row, 9).Value '左上：名字
                If status = "Paid" Then
                    .Cells(1, 2).Value = price '右上：价格
                End If
            ElseIf j = 1 Then
                .Cells(1, 1).Value = wsOrder.Cells(row, 8).Value '电话
            ElseIf j = blockHeight - 1 Then
                .Cells(1, 2).Value = shortName '缩写
            End If
        End With
    Next j
End Sub





```

## Clear Block

```vba
Sub ClearBlocks(ByVal targetDate As Date)
    Dim wsDaily As Worksheet
    Dim startCol As Long
    Dim endCol As Long
    Dim appointmentTimeCol As Long
    Dim targetRange As Range
    Dim currentRow As Long
    Dim col As Long

    ' 获取工作表，假设是排班表（"排班_日期"）
    Set wsDaily = ThisWorkbook.Sheets("排班_" & Day(targetDate))
    
    Debug.Print "Day(targetDate) = " & Day(targetDate)
    
    ' 找到预约时间所在的列
    appointmentTimeCol = 0 ' 初始化列号
    For col = 1 To wsDaily.Columns.Count
        If wsDaily.Cells(1, col).Value = "预约时间" Then ' 假设 "预约时间" 在第3行
            appointmentTimeCol = col
            Exit For
        End If
    Next col
    
    If appointmentTimeCol = 0 Then
        MsgBox "找不到预约时间列！", vbExclamation
        Exit Sub
    End If
    
    ' 计算清除范围的结束列（预约时间列 - 2）
    endCol = appointmentTimeCol - 2
    
    ' 构建目标范围，从C6到目标结束列，行范围是6到69
    Set targetRange = wsDaily.Range(wsDaily.Cells(6, 3), wsDaily.Cells(69, endCol))
    
    ' 清除内容和背景颜色
    targetRange.Clear ' 清除内容、背景颜色和格式
End Sub




```

## Public variable

`Public g_Target As Range`

`Public g_nextTime As Date`

## Delete rows if id is empty

```vba
Sub DeleteRowsWithEmptyFirstColumn()
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim i As Long

    ' 设置目标工作表
    Set ws = ThisWorkbook.Sheets("Orders")
    
    ' 找到最后一行（避免整个表都遍历，提高性能）
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).row

    ' 从最后一行开始往上遍历，避免删除行导致跳行
    For i = lastRow To 1 Step -1
        If Trim(ws.Cells(i, 1).Value) = "" Then
            ws.Rows(i).Delete
        End If
    Next i
End Sub


```

## temp

```vba

Private Sub SaveButton_Click()

End Sub

Private Sub UserForm_Initialize()
    ' 读取订单信息
    Dim wsOrders As Worksheet, wsPayments As Worksheet, wsLists As Worksheet, wsServices As Worksheet
    Set wsOrders = ThisWorkbook.Sheets("Orders")
    Set wsPayments = ThisWorkbook.Sheets("OrderPayments")
    Set wsLists = ThisWorkbook.Sheets("Lists")
    Set wsServices = ThisWorkbook.Sheets("Services")
    
    ' 加载订单信息（比如客户名、时间、应收金额等）
    Dim orderRow As Range
    Set orderRow = wsOrders.Range("A:A").Find(SelectedOrderId, , xlValues, xlWhole)
    If Not orderRow Is Nothing Then
        ' 加载字段
        Me.NameInput.Value = orderRow.Offset(0, 8).Value
        Me.PhoneInput.Value = orderRow.Offset(0, 7).Value
        Me.DateInput.Value = orderRow.Offset(0, 1).Value
        Me.TimeInput.Value = Format(orderRow.Offset(0, 2).Value, "hh:mm")
        ' 下拉表单从其他sheet读取
        LoadComboFromRange Me.TechnicianSelection, wsLists.Range("B1:B" & wsLists.Cells(wsLists.Rows.Count, "B").End(xlUp).row)
        LoadComboFromRange Me.StatusSelection, wsLists.Range("C1:C" & wsLists.Cells(wsLists.Rows.Count, "C").End(xlUp).row)
        LoadComboFromRange Me.ServiceSelection, wsServices.Range("A2:A" & wsServices.Cells(wsServices.Rows.Count, "A").End(xlUp).row)
        LoadComboFromRange Me.ReqSelection, wsLists.Range("A1:A" & wsLists.Cells(wsLists.Rows.Count, "A").End(xlUp).row)
        Me.ServiceSelection = orderRow.Offset(0, 4).Value
        Me.TechnicianSelection = orderRow.Offset(0, 6).Value
        Me.StatusSelection = orderRow.Offset(0, 9).Value
        Me.ReqSelection = orderRow.Offset(0, 5).Value
        '根据Services表查找价格
        Dim price As Variant
        Dim i As Long
        For i = 2 To wsServices.Cells(wsServices.Rows.Count, 1).End(xlUp).row
            If wsServices.Cells(i, 1).Value = Me.ServiceSelection.Value Then
                price = wsServices.Cells(i, 3).Value
                Exit For
            End If
        Next i
        If price = 0 Then Exit Sub
        Me.AmountInput = price
    End If
    
End Sub
Private Sub LoadComboFromRange(combo As MSForms.ComboBox, rng As Range)
    Dim cell As Range
    combo.Clear
    For Each cell In rng
        If Trim(cell.Value) <> "" And Trim(cell.Value) <> "Paid" Then combo.AddItem cell.Value
    Next cell
End Sub

```

