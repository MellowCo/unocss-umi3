import '../uno.css'

export default function IndexPage() {
  return (
    <div className='flex flex-col items-center text-xl space-y-4'>
      <div className='c-green text-xl font-bold'>unocss</div>
      <div className="i-ph-anchor-simple-thin" />
      <div className="i-mdi-alarm text-orange-400" />
      <div className="i-logos-vue text-3xl" />
      <button className="i-carbon-sun dark:i-carbon-moon" />
      <div className="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
    </div>
  );
}
