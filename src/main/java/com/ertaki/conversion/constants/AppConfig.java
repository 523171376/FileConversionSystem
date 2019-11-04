package com.ertaki.conversion.constants;
/**
 * 
 * @author ZWC
 *
 */
public class AppConfig {
    private AppConfig() {
        
    }
    /** Office文件上传位置 */
    public static final String UPLOAD_PDF_OFILE_PATH = "C:\\zhpt\\file\\pdf\\oldfile\\";
    /** pdf转换文件位置 */
    public static final String UPLOAD_PDF_PDFFILE_PATH = "C:\\zhpt\\file\\pdf\\newfile\\";
    /** pdf文件上传位*/
    public static final String UPLOAD_WORD_PFILE_PATH = "C:\\zhpt\\file\\word\\oldfile\\";
    /** word转换文件位置 */
    public static final String UPLOAD_WORD_WFILE_PATH = "C:\\zhpt\\file\\word\\newfile\\";
    /** openoffice 启动ip地址  */
    public static final String OPEN_OFFICE_HOST = "127.0.0.1";
    /** openoffice 启动端口号地址   */
    public static final int OPEN_OFFICE_PORT = 8100;
}
