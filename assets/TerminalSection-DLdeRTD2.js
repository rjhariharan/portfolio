import{a as e}from"./rolldown-runtime-Cyuzqnbw.js";import{c as t,l as n,o as r}from"./framer-motion-Cw9ocUFM.js";import{X as i}from"./react-vendor-ByvH9iI9.js";var a=e(n(),1),o=t();function s(){let[e,t]=(0,a.useState)(``),[n,s]=(0,a.useState)([{command:`welcome`,output:`Initializing secure terminal connection...
Welcome to R.J. Hariharan Core Shell v1.0.0
Type 'help' to see all available command options.
--------------------------------------------------`}]),c=(0,a.useRef)(null),l=(0,a.useRef)(null);return(0,a.useEffect)(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[n]),(0,o.jsxs)(`section`,{id:`terminal`,className:`py-24 relative overflow-hidden section-alt-2`,children:[(0,o.jsx)(`div`,{className:`absolute top-1/2 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none -z-10`}),(0,o.jsxs)(`div`,{className:`container mx-auto px-6 md:px-12 relative z-10`,children:[(0,o.jsx)(`div`,{className:`mb-16 md:text-center`,children:(0,o.jsxs)(r.div,{initial:{opacity:0,y:15},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[(0,o.jsx)(`h2`,{className:`text-3xl md:text-5xl font-bold font-display mb-4`,children:`Command Terminal`}),(0,o.jsx)(`div`,{className:`w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-fuchsia mb-8 md:mx-auto`}),(0,o.jsx)(`p`,{className:`text-secondary max-w-2xl mx-auto`,children:`Run interactive commands directly from your keyboard to fetch profile details or technical configurations.`})]})}),(0,o.jsxs)(r.div,{initial:{opacity:0,y:25},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.7},onClick:()=>{c.current?.focus()},className:`max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#050508] shadow-2xl overflow-hidden cursor-text`,children:[(0,o.jsxs)(`div`,{className:`flex items-center justify-between px-4 py-3 bg-[#0a0a0f] border-b border-white/5 select-none`,children:[(0,o.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,o.jsx)(`span`,{className:`w-3 h-3 rounded-full bg-red-500/80`}),(0,o.jsx)(`span`,{className:`w-3 h-3 rounded-full bg-yellow-500/80`}),(0,o.jsx)(`span`,{className:`w-3 h-3 rounded-full bg-green-500/80`})]}),(0,o.jsxs)(`div`,{className:`flex items-center space-x-1.5 text-slate-400 font-mono text-[10px] sm:text-xs`,children:[(0,o.jsx)(i,{}),(0,o.jsx)(`span`,{children:`rjhariharan@portfolio: ~`})]}),(0,o.jsx)(`div`,{className:`w-14`}),` `]}),(0,o.jsxs)(`div`,{ref:l,"data-lenis-prevent":!0,className:`p-6 font-mono text-xs sm:text-sm text-slate-200 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4 scrollbar-thin`,children:[n.map((e,t)=>(0,o.jsxs)(`div`,{className:`space-y-1`,children:[e.command!==`welcome`&&(0,o.jsxs)(`div`,{className:`flex items-center space-x-2 text-white`,children:[(0,o.jsx)(`span`,{className:`text-accent-blue font-bold`,children:`rjhariharan@portfolio:~$`}),(0,o.jsx)(`span`,{children:e.command})]}),(0,o.jsx)(`pre`,{className:`text-slate-400 whitespace-pre-wrap leading-relaxed`,children:e.output})]},t)),(0,o.jsxs)(`form`,{onSubmit:n=>{n.preventDefault();let r=e.trim().toLowerCase();if(!r)return;let i=``;switch(r){case`help`:i=`Available CLI Commands:
  about    - Displays full developer biography
  skills   - Lists technical stacks by categories
  projects - Displays active application specs
  contact  - Outputs secure email, phone & social coordinates
  clear    - Resets command line output log buffer`;break;case`about`:i=`R.J. Hariharan - Full Stack Software Developer
--------------------------------------------------
Experience : 6+ Months Professional Full-Stack Experience
Key Projects: Refactored enterprise Vvendu Auction modules, Java model structures,
             and configured encrypted mobile-to-API communication flows.
Core Focus : Web APIs, encrypted requests/responses, and microservices.`;break;case`skills`:i=`Technical Arsenal Summary:
--------------------------------------------------
[Frontend] : React, JavaScript, TypeScript, Tailwind CSS
[Backend]  : Java, Spring Boot, REST APIs, JWT Auth, Node.js
[Database] : MySQL, Firebase
[Mobile]   : React Native
[Tools]    : Git & GitHub, Sensors, Automation`;break;case`projects`:i=`Featured Project Catalog:
--------------------------------------------------
1. Vvendu Auction Platform (React, Spring Boot, MySQL | Live: vvendu.com)
2. Personal Brand Portfolio (React, Tailwind, Lenis, GSAP | Source: /portfolio)
3. IoT Smart Lock System (Java, TAMPER Sensors, Microcontrollers)
4. Foodyguy Order Platform (Java POJO, DAO pattern, JDBC, MySQL)`;break;case`contact`:i=`Contact Information:
--------------------------------------------------
Email    : rjhariharan1@gmail.com
Phone    : +91 9342305427
Location : Mayiladuthurai, Tamil Nadu, India
GitHub   : https://github.com/rjhariharan
LinkedIn : https://in.linkedin.com/in/rjhariharan
Instagram: https://www.instagram.com/rjhariharan_`;break;case`clear`:s([]),t(``);return;default:i=`Command not found: "${r}". Type "help" to display options.`}s(t=>[...t,{command:e,output:i}]),t(``)},className:`flex items-center space-x-2 pt-1`,children:[(0,o.jsx)(`span`,{className:`text-accent-blue font-bold shrink-0`,children:`rjhariharan@portfolio:~$`}),(0,o.jsx)(`input`,{ref:c,type:`text`,value:e,onChange:e=>t(e.target.value),className:`flex-grow bg-transparent text-white outline-none border-none caret-accent-indigo`,placeholder:`type command here...`,autoComplete:`off`,autoCorrect:`off`,autoCapitalize:`off`,spellCheck:!1})]})]})]})]})]})}export{s as default};