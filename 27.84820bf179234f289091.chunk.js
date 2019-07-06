(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{310:function(n,e,a){"use strict";a.r(e),e.default='<p>At its core, <strong>webpack</strong> is a <em>static module bundler</em> for modern JavaScript applications. When webpack processes your application, it internally builds a <a href="/concepts/dependency-graph/">dependency graph</a> which maps every module your project needs and generates one or more <em>bundles</em>.</p>\n<blockquote class="tip">\n<p>Learn more about JavaScript modules and webpack modules <a href="/concepts/modules">here</a>.</p>\n</blockquote>\n<p>Since version 4.0.0, <strong>webpack does not require a configuration file</strong> to bundle your project. Nevertheless, it is <a href="/configuration">incredibly configurable</a> to better fit your needs.</p>\n<p>To get started you only need to understand its <strong>Core Concepts</strong>:</p>\n<ul>\n<li><a href="#entry">Entry</a></li>\n<li><a href="#output">Output</a></li>\n<li><a href="#loaders">Loaders</a></li>\n<li><a href="#plugins">Plugins</a></li>\n<li><a href="#mode">Mode</a></li>\n<li><a href="#browser-compatibility">Browser Compatibility</a></li>\n</ul>\n<p>This document is intended to give a <strong>high-level</strong> overview of these concepts, while providing links to detailed concept-specific use cases.</p>\n<p>For a better understanding of the ideas behind module bundlers and how they work under the hood, consult these resources:</p>\n<ul>\n<li><a href="https://www.youtube.com/watch?v=UNMkLHzofQI">Manually Bundling an Application</a></li>\n<li><a href="https://www.youtube.com/watch?v=Gc9-7PBqOC8">Live Coding a Simple Module Bundler</a></li>\n<li><a href="https://github.com/ronami/minipack">Detailed Explanation of a Simple Module Bundler</a></li>\n</ul>\n<h2 id="entry">Entry<a href="#entry" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>An <strong>entry point</strong> indicates which module webpack should use to begin building out its internal <a href="/concepts/dependency-graph/">dependency graph</a>. webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).</p>\n<p>By default its value is <code>./src/index.js</code>, but you can specify a different (or multiple entry points) by configuring the <strong>entry</strong> property in the <a href="/configuration">webpack configuration</a>. For example:</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token punctuation">:</span> <span class="token string">\'./path/to/my/entry/file.js\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="tip">\n<p>Learn more in the <a href="/concepts/entry-points">entry points</a> section.</p>\n</blockquote>\n<h2 id="output">Output<a href="#output" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The <strong>output</strong> property tells webpack where to emit the <em>bundles</em> it creates and how to name these files. It defaults to <code>./dist/main.js</code> for the main output file and to the <code>./dist</code> folder for any other generated file.</p>\n<p>You can configure this part of the process by specifying an <code>output</code> field in your configuration:</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  entry<span class="token punctuation">:</span> <span class="token string">\'./path/to/my/entry/file.js\'</span><span class="token punctuation">,</span>\n  output<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    path<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'dist\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    filename<span class="token punctuation">:</span> <span class="token string">\'my-first-webpack.bundle.js\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>In the example above, we use the <code>output.filename</code> and the <code>output.path</code> properties to tell webpack the name of our bundle and where we want it to be emitted to. In case you\'re wondering about the path module being imported at the top, it is a core <a href="https://nodejs.org/api/modules.html">Node.js module</a> that gets used to manipulate file paths.</p>\n<blockquote class="tip">\n<p>The <code>output</code> property has <a href="/configuration/output">many more configurable features</a>. If you want to learn about the concepts behind it, you can <a href="/concepts/output">read more in the output section</a>.</p>\n</blockquote>\n<h2 id="loaders">Loaders<a href="#loaders" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Out of the box, webpack only understands JavaScript and JSON files. <strong>Loaders</strong> allow webpack to process other types of files and convert them into valid <a href="/concepts/modules">modules</a> that can be consumed by your application and added to the dependency graph.</p>\n<blockquote class="warning">\n<p>Note that the ability to <code>import</code> any type of module, e.g. <code>.css</code> files, is a feature specific to webpack and may not be supported by other bundlers or task runners. We feel this extension of the language is warranted as it allows developers to build a more accurate dependency graph.</p>\n</blockquote>\n<p>At a high level, <strong>loaders</strong> have two properties in your webpack configuration:</p>\n<ol>\n<li>The <code>test</code> property identifies which file or files should be transformed.</li>\n<li>The <code>use</code> property indicates which loader should be used to do the transforming.</li>\n</ol>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  output<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    filename<span class="token punctuation">:</span> <span class="token string">\'my-first-webpack.bundle.js\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span> test<span class="token punctuation">:</span> <span class="token regex">/\\.txt$/</span><span class="token punctuation">,</span> use<span class="token punctuation">:</span> <span class="token string">\'raw-loader\'</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>The configuration above has defined a <code>rules</code> property for a single module with two required properties: <code>test</code> and <code>use</code>. This tells webpack\'s compiler the following:</p>\n<blockquote>\n<p>"Hey webpack compiler, when you come across a path that resolves to a \'.txt\' file inside of a <code>require()</code>/<code>import</code> statement, <strong>use</strong> the <code>raw-loader</code> to transform it before you add it to the bundle."</p>\n</blockquote>\n<blockquote class="warning">\n<p>It is important to remember that when defining rules in your webpack config, you are defining them under <code>module.rules</code> and not <code>rules</code>. For your benefit, webpack will warn you if this is done incorrectly.</p>\n</blockquote>\n<blockquote class="warning">\n<p>Keep in mind that when using regex to match files, you may not quote it. i.e <code>/\\.txt$/</code> is not the same as <code>\'/\\.txt$/\'</code> or <code>"/\\.txt$/"</code>. The former instructs webpack to match any file that ends with .txt and the latter instructs webpack to match a single file with an absolute path \'.txt\'; this is likely not your intention. </p>\n</blockquote>\n<p>You can check further customization when including loaders in the <a href="/concepts/loaders">loaders section</a>.</p>\n<h2 id="plugins">Plugins<a href="#plugins" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.</p>\n<blockquote class="tip">\n<p>Check out the <a href="/api/plugins">plugin interface</a> and how to use it to extend webpack\'s capabilities.</p>\n</blockquote>\n<p>In order to use a plugin, you need to <code>require()</code> it and add it to the <code>plugins</code> array. Most plugins are customizable through options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it with the <code>new</code> operator.</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'html-webpack-plugin\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//installed via npm</span>\n<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//to access built-in plugins</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span> test<span class="token punctuation">:</span> <span class="token regex">/\\.txt$/</span><span class="token punctuation">,</span> use<span class="token punctuation">:</span> <span class="token string">\'raw-loader\'</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>template<span class="token punctuation">:</span> <span class="token string">\'./src/index.html\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>In the example above, the <code>html-webpack-plugin</code> generates an HTML file for your application by injecting automatically all your generated bundles.</p>\n<blockquote class="tip">\n<p>There are many plugins that webpack provides out of the box! Check out the <a href="/plugins">list of plugins</a>.</p>\n</blockquote>\n<p>Using plugins in your webpack config is straightforward. However, there are many use cases that are worth further exploration. <a href="/concepts/plugins">Learn more about them here</a>.</p>\n<h2 id="mode">Mode<a href="#mode" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>By setting the <code>mode</code> parameter to either <code>development</code>, <code>production</code> or <code>none</code>, you can enable webpack\'s built-in optimizations that correspond to each environment. The default value is <code>production</code>.</p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  mode<span class="token punctuation">:</span> <span class="token string">\'production\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>Learn more about the <a href="/configuration/mode">mode configuration here</a> and what optimizations take place on each value.</p>\n<h2 id="browser-compatibility">Browser Compatibility<a href="#browser-compatibility" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>webpack supports all browsers that are <a href="https://kangax.github.io/compat-table/es5/">ES5-compliant</a> (IE8 and below are not supported). webpack needs <code>Promise</code> for <code>import()</code> and <code>require.ensure()</code>. If you want to support older browsers, you will need to <a href="/guides/shimming/">load a polyfill</a> before using these expressions.</p>\n'}}]);