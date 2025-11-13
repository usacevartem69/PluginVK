import * as vscode from 'vscode';
/** 
 * Активирует расширение при запуске VS Code 
 * 
 * Регистрирует все команды плагина для работы с VK
 */

export function activate(context: vscode.ExtensionContext) {
    /**
     * Команда для быстрого открытия VK в браузере по умолчанию
     */
    
    let OpenVkCommand = vscode.commands.registerCommand('VK.OpenVk', async() => {
        const VkUrl = "https://vk.com";
        vscode.env.openExternal(vscode.Uri.parse(VkUrl));
        vscode.window.showInformationMessage('Открываю ВК...');
    });
    /**
     * Команда для создания шаблона поста ВК в текущем редакторе
     * 
     * Генерирует готовый шаблон с хештегами и форматированием
     * 
     * Если редактора нет, возвращает ошибку
     */
    let CreatePostCommand = vscode.commands.registerCommand('VK.CreatePostTemplate', async () => {
        const editor = vscode.window.activeTextEditor;
        if(!editor) {
            vscode.window.showErrorMessage('Нет активного окна(');
            return;
        }
         /**
         * Шаблон поста с предустановленными хештегами
         */
        const PostTemplate = `# Пост для ВК\n\nПривет, друзья! 🙌 \n\nСегодня хочу поделиться с вами... 
        🙊 \n\n#УлетелНаДопсу #ОПМогила #ИСПРОСила \n\n📅 ${new Date().toLocaleDateString()}`;

        await editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, PostTemplate);
        });
    });
    /**
     * Команда для копирования текста в буфер обмена и открытия VK
     * 
     * Копирует выделенный текст или весь документ для быстрой публикации
     * 
     * Если нет активного редактора или текст пустой, возвращает ошибку
     */
    let OpenVkWithTextCommand = vscode.commands.registerCommand('VK.OpenVkWithText', async() => {
        const editor = vscode.window.activeTextEditor;
        if(!editor) {
            vscode.window.showErrorMessage('Нет активного редактора(');
            return;
        }
        /**
         * Текст для публикации - выделенный фрагмент или весь документ
         */
        const text = editor.document.getText(editor.selection) || editor.document.getText();
        if (!text.trim()) {
            vscode.window.showWarningMessage('Нет текста для поста!');
            return;
        }

    
        await vscode.env.clipboard.writeText(text);
        
        const vkUrl = "https://vk.com";
        vscode.env.openExternal(vscode.Uri.parse(vkUrl));
        
        vscode.window.showInformationMessage('Текст скопирован в буфер! Открываю ВК...');
    });
    /**
     * Коллекция всех зарегистрированных команд плагина
     */
    context.subscriptions.push(OpenVkCommand, CreatePostCommand, OpenVkWithTextCommand);
}
/** 
 * Деактивирует расширение при закрытии VS Code
 */
export function deactivate() {}