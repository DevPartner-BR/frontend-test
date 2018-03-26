/*
 * jQuery Excel Export Plugin Library
 * http://tarunbatta.blogspot.com/
 *
 * Copyright (c) 2013 Tarun Batta
 * Licensed under BTechCo licenses.
 * https://github.com/btechco/btechco_excelexport/wiki
 *
 */

(function ($) {

    $datatype = {
        Table: 1
        , Json: 2
        , Xml: 3
        , JqGrid: 4
    }

    var $defaults = {
        containerid: null
        , datatype: $datatype.Table
        , dataset: null
        , columns: null
        , filename: null
    };

    var $settings = $defaults;

    $.fn.btechco_excelexport = function (options) {
        $settings = $.extend({}, $defaults, options);

        switch ($settings.datatype) {
            case 1:
                Export($("#" + $settings.containerid).parent().html());
                break;
            case 2:
                Export(ConvertJsonToTable());
                break;
            case 3:
                Export(ConvertXmlToTable());
                break;
            case 4:
                Export(ConvertJqGridDataToTable());
                break;
        }

        function ConvertJsonToTable() {
            var result = "<table>";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $($settings.dataset).each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if (value.hasOwnProperty(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'";
                            }
                            result += ">";
                            result += value[this.datafield];
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }

        function ConvertXmlToTable() {
            var result = "<table>";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";

            result += "<tbody>";
            $($settings.dataset).find("row").each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if ($(value).attr(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'";
                            }
                            result += ">";
                            result += $(value).attr(this.datafield);
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }

        function ConvertJqGridDataToTable() {
            var result = "<table>";

            result += "<thead><tr>";
            $($settings.columns).each(function (key, value) {
                if (this.ishidden != true) {
                    result += "<th";
                    if (this.width != null) {
                        result += " style='width: " + this.width + "'";
                    }
                    result += ">";
                    result += this.headertext;
                    result += "</th>";
                }
            });
            result += "</tr></thead>";
            result += "<tbody>";

            $($settings.dataset).find("rows > row").each(function (key, value) {
                result += "<tr>";
                $($settings.columns).each(function (k, v) {
                    if ($(value).find(this.datafield)) {
                        if (this.ishidden != true) {
                            result += "<td class=xl65 ";
                            if (this.width != null) {
                                result += " style='width: " + this.width + "'";
                            }
                            result += ">";
                            result += $(value).find(this.datafield).text();
                            result += "</td>";
                        }
                    }
                });
                result += "</tr>";
            });
            result += "</tbody>";

            result += "</table>";
            return result;
        }

        function Export(htmltable) {
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
            excelFile += "<head>";
            excelFile += "<!--[if gte mso 9]>";
            excelFile += "<xml>";
            excelFile += "<x:ExcelWorkbook>";
            excelFile += "<x:ExcelWorksheets>";
            excelFile += "<x:ExcelWorksheet>";
            excelFile += "<x:Name>";
            excelFile += "{worksheet}";
            excelFile += "</x:Name>";
            excelFile += "<x:WorksheetOptions>";
            excelFile += "<x:DisplayGridlines/>";
            excelFile += "</x:WorksheetOptions>";
            excelFile += "</x:ExcelWorksheet>";
            excelFile += "</x:ExcelWorksheets>";
            excelFile += "</x:ExcelWorkbook>";
            excelFile += "</xml>";
            excelFile += "<![endif]-->";
            excelFile += "<style>";
            excelFile += "tr";
            excelFile += "{mso-height-source:auto;}";
            excelFile += "col";
            excelFile += "{mso-width-source:auto;}";
            excelFile += "br";
            excelFile += "{mso-data-placement:same-cell;}";
            excelFile += ".style17";
            excelFile += "{mso-number-format:'_-* \#\,\#\#0\.00_-\;\\-* \#\,\#\#0\.00_-\;_-* \0022-\0022??_-\;_-\@_-';";
            excelFile += "    mso-style-name:Vírgula;";
            excelFile += "    mso-style-id:3;}";
            excelFile += ".style0";
            excelFile += "{mso-number-format:General;";
            excelFile += "    text-align:general;";
            excelFile += "    vertical-align:bottom;";
            excelFile += "    white-space:nowrap;";
            excelFile += "    mso-rotate:0;";
            excelFile += "    mso-background-source:auto;";
            excelFile += "    mso-pattern:auto;";
            excelFile += "    color:black;";
            excelFile += "    font-size:11.0pt;";
            excelFile += "    font-weight:400;";
            excelFile += "    font-style:normal;";
            excelFile += "    text-decoration:none;";
            excelFile += "    font-family:Calibri, sans-serif;";
            excelFile += "    mso-font-charset:0;";
            excelFile += "    border:none;";
            excelFile += "    mso-protection:locked visible;";
            excelFile += "    mso-style-name:Normal;";
            excelFile += "    mso-style-id:0;}";
            excelFile += "td";
            excelFile += "{mso-style-parent:style0;";
            excelFile += "    padding-top:1px;";
            excelFile += "    padding-right:1px;";
            excelFile += "    padding-left:1px;";
            excelFile += "    mso-ignore:padding;";
            excelFile += "    color:black;";
            excelFile += "    font-size:11.0pt;";
            excelFile += "    font-weight:400;";
            excelFile += "    font-style:normal;";
            excelFile += "    text-decoration:none;";
            excelFile += "    font-family:Calibri, sans-serif;";
            excelFile += "    mso-font-charset:0;";
            excelFile += "    mso-number-format:General;";
            excelFile += "    text-align:general;";
            excelFile += "    vertical-align:bottom;";
            excelFile += "    border:none;";
            excelFile += "    mso-background-source:auto;";
            excelFile += "    mso-pattern:auto;";
            excelFile += "    mso-protection:locked visible;";
            excelFile += "    white-space:nowrap;";
            excelFile += "    mso-rotate:0;}";
            excelFile += ".imp_Texto";
            excelFile += "{mso-style-parent:style0;";
            excelFile += "    mso-number-format:'\@';}";
            excelFile += ".imp_Inteiro";
            excelFile += "{mso-style-parent:style7;";
            excelFile += "    mso-number-format:'\#\,\#\#0';}";
            excelFile += ".imp_Decimal";
            excelFile += "{mso-style-parent:style0;";
            excelFile += "    mso-number-format:'\#\,\#\#0.00';}";
            excelFile += ".imp_Data";
            excelFile += "{mso-style-parent:style0;";
            excelFile += "    mso-number-format:'Short Date';}";
            excelFile += "</style>";

            excelFile += "</head>";
            excelFile += "<body>";
            if (htmltable) {
                excelFile += htmltable.replace(/"/g, '\'');
            } 
            excelFile += "</body>";
            excelFile += "</html>";
            var base64data = "base64," + $.base64.encode(excelFile);

            var filename = ($settings.filename == null) ? 'test' :  $settings.filename;
            var uri = 'data:application/vnd.ms-excel;' + base64data;
            var downloadLink = document.createElement("a");
            downloadLink.href = uri;
            downloadLink.download = filename+".xls";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            //window.open('data:application/vnd.ms-excel;charset=utf-8;filename='+filename+';' + base64data);
        }
    };
})(jQuery);