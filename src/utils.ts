import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 
 * @param targetPath 获取相对根目录的相对路径
 */
export function getRaletivePathFromRoot(targetPath){
    let rootPath=vscode.workspace.workspaceFolders[0].uri.path;
    return path.relative(rootPath,targetPath);
}