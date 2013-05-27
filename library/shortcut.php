<?php

defined('CD_LIBRARY_ROOT') or define('CD_LIBRARY_ROOT', dirname(__FILE__));

/**
 * This is the shortcut to DIRECTORY_SEPARATOR
 */
defined('DS') or define('DS', DIRECTORY_SEPARATOR);
 
/**
 * This is the shortcut to Yii::app()
 * @return CWebApplication Yii::app()
 */
function app()
{
    return Yii::app();
}

/**
 * This is the shortcut to Yii::app()->clientScript
 * @return CClientScript Yii::app()->clientScript
 */
function cs()
{
    return Yii::app()->clientScript;
}

/**
 * This is the shortcut to Yii::app()->createUrl()
 * @param string $route
 * @param array $params
 * @param string $anchor
 * @param string $ampersand
 * @return string 相对url地址
 */
function url($route, array $params=array(), $anchor = null, $ampersand='&')
{
    return Yii::app()->createUrl($route, $params, $ampersand) . ($anchor !== null ? '#' . $anchor : '');
}

/**
 * This is the shortcut to Yii::app()->createAbsoluteUrl()
 * @param string $route
 * @param array $params
 * @param string $anchor
 * @param string $ampersand
 * @return string 绝对url地址
 */
function aurl($route, array $params=array(), $schema='', $anchor = null, $ampersand='&')
{
    return Yii::app()->createAbsoluteUrl($route, $params, $schema, $ampersand) . ($anchor !== null ? '#' . $anchor : '');
}

/**
 * This is the shortcut to CHtml::encode
 * @param string $text 待处理字符串
 * @return string 使用CHtml::encode(即htmlspecialchars)处理过的字符串
 */
function h($text)
{
    return CHtml::encode($text);
}
 
/**
 * This is the shortcut to CHtml::link()
 * @param string $text 链接显示文本
 * @param string $url 链接地址
 * @param array $htmlOptions <a>标签附加属性
 * @return string <a>链接html代码
 */
function l($text, $url = '#', $htmlOptions = array())
{
    return CHtml::link($text, $url, $htmlOptions);
}

/**
 * This is the shortcut to CHtml::image()
 * @param string $src 图片url
 * @param string $alt img标签alt属性
 * @param array $htmlOptions <img>标签附加属性
 * @return string <img>html代码
 */
function image($src, $alt='', $htmlOptions=array())
{
    return CHtml::image($src, $alt, $htmlOptions);
}
 
/**
 * This is the shortcut to Yii::t() with default category = 'stay'
 */
function t($message, $category = 'main', $params = array(), $source = null, $language = null)
{
    return Yii::t($category, $message, $params, $source, $language);
}
 
/**
 * This is the shortcut to Yii::app()->request->baseUrl
 * If the parameter is given, it will be returned and prefixed with the app baseUrl.
 * @param string $url 相对url地址
 * @return string 返回相对url地址
 */
function bu($url = null)
{
    static $baseUrl = null;
    if ($baseUrl === null)
        $baseUrl = rtrim(Yii::app()->request->baseUrl, '/') . '/';
    return $url === null ? $baseUrl : $baseUrl . ltrim($url, '/');
}

/**
 * This is the shortcut to Yii::app()->request->getBaseUrl(true)
 * If the parameter is given, it will be returned and prefixed with the app absolute baseUrl.
 * @param string $url 相对url地址
 * @return string 返回绝对url地址
 */
function abu($url = null)
{
    static $baseUrl = null;
    if ($baseUrl === null)
        $baseUrl = rtrim(Yii::app()->request->getBaseUrl(true), '/') . '/';
    return $url === null ? $baseUrl : $baseUrl. ltrim($url, '/');
}
 
/**
 * Returns the named application parameter.
 * This is the shortcut to Yii::app()->params[$name].
 * @param string $name 参数名称
 * @return mixed 参数值
 */
function param($name)
{
    return Yii::app()->params[$name];
}
 
/**
 * This is the shortcut to Yii::app()->user.
 * @return CWebUser
 */
function user()
{
    return Yii::app()->user;
}

/**
 * this is the shortcut to Yii::app()->theme->baseUrl
 * @param string $url
 * @return Ambigous <string, NULL> Yii::app()->theme->baseUrl
 */
function tbu($file = null, $checkExist = false, $themeName = null)
{
    if ($themeName === null)
        $theme = app()->theme;
    elseif (is_string($themeName))
        $theme = tm()->getTheme($themeName);
    elseif ($themeName instanceof CDTheme)
        $theme = $themeName;

    $url = null;
    if ($theme !== null) {
        if ($checkExist) {
            $filename = $theme->getBasePath() . DS . ltrim($file, DS);
            if (file_exists($filename))
                $url = $theme->getBaseUrl() . '/' . ltrim($file, '/');
        }
    }

    return $url;
}

/**
 * 获取theme文件的物理路径
 * @param string $file
 * @param bool $useDefault 如果theme不存在此文件，是否返回默认theme文件
 * @param string $themeName theme名字
 * @return Ambigous <string, NULL> 如果存在返回路径，不存在返回空
 */
function tbp($file = null, $checkExist = false, $themeName = null)
{
    if ($themeName === null)
        $theme = app()->theme;
    elseif (is_string($themeName))
        $theme = tm()->getTheme($themeName);
    elseif ($themeName instanceof CDTheme)
        $theme = $themeName;

    $filepath = null;
    if ($theme !== null) {
        $filepath = $theme->getBasePath() . DS . ltrim($file, DS);
        if ($checkExist && !file_exists($filepath))
            $filepath = null;
    }

    return $filepath;
}

function resbu($file, $checkExit = false, $themeName = null)
{
    if ($themeName === null)
        $theme = app()->theme;
    elseif (is_string($themeName))
        $theme = tm()->getTheme($themeName);
    elseif ($themeName instanceof CDTheme)
        $theme = $themeName;
    
    if ($theme === null)
        $url = sbu($file);
    else
        $url = tbu($file, $checkExit, $theme);
    
    return $url;
}

/**
 * This is the shortcut to Yii::app()->authManager.
 * @return IAuthManager Yii::app()->authManager
 */
function auth()
{
    return Yii::app()->authManager;
}

/**
 * 此函数返回附件地址相对于BasePath的物理路径
 * @param string $file 附件文件相对path地址
 * @return string
 */
function fbp($file = null)
{
    static $uploadBasePath = null;
    if ($uploadBasePath === null)
        $uploadBasePath = rtrim(param('uploadBasePath'), DS) . DS;

    return empty($file) ? $uploadBasePath : $uploadBasePath . ltrim($file, DS);
}

/**
 * 此函数返回附件地址的BaseUrl
 * @param string $url 附件文件相对url地址
 * @return string
 */
function fbu($url = null)
{
    static $uploadBaseUrl = null;
    if ($uploadBaseUrl === null)
        $uploadBaseUrl = rtrim(param('uploadBaseUrl'), '/') . '/';
    
    if (empty($url))
        return $uploadBaseUrl;
    else
        return (stripos($url, 'http://') === 0) ? $url : $uploadBaseUrl . ltrim($url, '/');
}

/**
 * 此函数返回附件地址相对于BasePath的物理路径
 * @param string $file 附件文件相对path地址
 * @return string
 */
function sbp($file = null)
{
    static $resourcePath = null;
    if ($resourcePath === null)
        $resourcePath = rtrim(param('resourceBasePath'), DS) . DS;

    return empty($file) ? $resourcePath : $resourcePath . ltrim($file, DS);
}

/**
 * 此函数返回附件地址的BaseUrl
 * @param string $url 静态资源文件相对url地址
 * @return string
 */
function sbu($url = null)
{
    static $resourceBaseUrl = null;
    if ($resourceBaseUrl === null)
        $resourceBaseUrl = rtrim(param('resourceBaseUrl'), '/') . '/';
    
    if (empty($url))
        return $resourceBaseUrl;
    else
        return (stripos($url, 'http://') === 0) ? $url : $resourceBaseUrl . ltrim($url, '/');
}

/**
 * This is the shortcut to Yii::app()->getStatePersister().
 * @return CStatePersister
 */
function sp()
{
    return Yii::app()->getStatePersister();
}

/**
 * This is the shortcut to Yii::app()->getSecurityManager().
 * @return CSecurityManager
 */
function sm()
{
    return Yii::app()->getSecurityManager();
}

/**
 * This is the shortcut to Yii::app()->request
 * @return CHttpRequest
 */
function request()
{
    return Yii::app()->request;
}

function dp($path = null)
{
    $dp = rtrim(param('dataPath'), DS) . DS;
    return $path ?  $dp . $path : $dp;
}

/**
 * This is the shortcut to Yii::app()->getSecurityManager().
 * @return CThemeManager
 */
function tm()
{
    return app()->getThemeManager();
}

/**
 * This is the shortcut to Yii::app()->getSecurityManager().
 * @return CAssetManager
 */
function am()
{
    return app()->getAssetManager();
}







