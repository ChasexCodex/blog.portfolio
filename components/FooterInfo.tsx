import Image from 'next/image'

const FooterInfo = () => {
  return (
      <footer>
        <div>
          <div>
            <p>Made by Elyas</p>
          </div>
          <div>
            <p>
              <span>Powered By</span>
              <span>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
              </span>
            </p>
          </div>
        </div>
      </footer>
  )
}

export default FooterInfo
