const Footer = () => {
  const date = new Date();
  return (
    <footer className="text-center bg-gray-50 w-full p-4 mt-5">
      <p>Copyright <a href="https://www.bizzbuzzcreations.com">BizzBuzz Creations</a> © {date.getFullYear()}. All rights reserved.</p>
    </footer>
  )
}

export default Footer;