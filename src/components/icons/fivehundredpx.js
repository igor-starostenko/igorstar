import React from 'react';
import PropTypes from 'prop-types';

const FivehundredpxIcon = ({ isDark, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...rest}
  >
    {isDark ? (
      <path d="M0 0v24h24v-24h-24zm17.757 8.148c-.102.114-.221.236-.345.236l-.146-.061c-.637-.552-1.223-.932-1.844-1.195-.782-.33-1.612-.498-2.469-.498-.756 0-1.586.158-2.336.444-.234.089-.354-.219-.4-.335-.056-.144-.078-.253-.069-.337.01-.088.057-.151.136-.182.733-.317 1.731-.506 2.669-.506.979 0 1.931.192 2.826.571.823.348 1.49.779 2.099 1.355.166.159.05.318-.121.508zm-6.015 4.176c-.094-.1-.056-.225.125-.405.104-.104.197-.157.275-.157l.114.046.586.587.581-.581c.101-.094.259-.051.423.112.113.113.226.26.098.398l-.583.588.56.56c.058.063.177.195-.062.438-.101.103-.198.155-.286.155-.064-.001-.12-.03-.171-.088l-.552-.551-.586.591-.133.049c-.087 0-.182-.05-.281-.147l-.018-.018c-.058-.056-.155-.148-.156-.255 0-.053.023-.105.071-.153l.584-.584-.589-.585zm.056 2.981c.035-.114.141-.461.391-.387.018.004.451.11.69.11 1.238 0 2.207-.966 2.207-2.198 0-.578-.226-1.12-.637-1.527-.414-.41-.97-.636-1.564-.636-.614 0-1.178.254-1.586.716-.358.403-.571.938-.571 1.43l-.003 3.689c.64.39 1.386.596 2.159.596 1.142 0 2.252-.456 3.047-1.251.805-.805 1.249-1.878 1.249-3.02 0-1.138-.446-2.21-1.255-3.02-.808-.807-1.883-1.252-3.03-1.252-1.152 0-2.23.444-3.037 1.251-.005.005-.522.525-.688.771l-.015.02c-.108.15-.21.291-.652.197-.227-.048-.471-.19-.471-.385v-6.068c.001-.164.133-.341.346-.341h7.829c.264.003.264.371.264.492s0 .489-.263.492h-7.24l.002 4.307c.504-.52 1.366-1.074 1.875-1.29.637-.269 1.352-.411 2.067-.411.707 0 1.393.138 2.039.411.624.264 1.184.642 1.665 1.123.481.481.858 1.041 1.123 1.665.273.646.412 1.332.412 2.039 0 .707-.139 1.393-.412 2.039-.264.624-.642 1.184-1.123 1.665-.481.48-1.041.858-1.665 1.122-.646.273-1.332.412-2.039.412-.707 0-1.393-.138-2.039-.412-.624-.264-1.184-.642-1.665-1.122-.481-.481-.858-1.041-1.122-1.664l-.136-.356c-.076-.25.27-.356.383-.391.26-.08.451-.12.535.104.215.568.543 1.128.871 1.492 0-.726.002-2.937.005-3.03v-.019c0-.749.329-1.502.904-2.067.604-.594 1.407-.92 2.262-.92 1.746 0 3.166 1.411 3.166 3.144 0 1.748-1.421 3.17-3.168 3.17-.343 0-.604-.023-1.002-.147-.041-.016-.242-.103-.108-.543zm6.364 2.505l-.058.06c-.668.668-1.446 1.192-2.312 1.559-.897.379-1.849.571-2.831.571s-1.935-.192-2.831-.572c-.866-.366-1.644-.891-2.312-1.558-.667-.667-1.192-1.445-1.558-2.312-.228-.539-.391-1.11-.482-1.688-.033-.25.313-.302.427-.32.274-.042.464-.027.504.18l.007.039c.031.176.125.711.412 1.422.294.729.751 1.406 1.356 2.012.582.582 1.259 1.038 2.013 1.357.78.33 1.609.497 2.464.497.854 0 1.684-.167 2.464-.497.754-.319 1.431-.775 2.013-1.357l.056-.056c.059-.059.135-.078.221-.053.084.024.18.09.293.203.291.293.227.433.154.513z" />
    ) : (
      <path d="M5.926 15.765l.204.534c.396.935.961 1.775 1.683 2.497.721.721 1.561 1.287 2.497 1.683.969.41 1.998.617 3.058.617 1.06 0 2.089-.208 3.058-.618.936-.396 1.775-.962 2.497-1.683s1.288-1.561 1.684-2.497c.41-.969.618-1.998.618-3.058 0-1.06-.208-2.089-.618-3.058-.396-.935-.962-1.775-1.684-2.497-.721-.721-1.561-1.288-2.497-1.684-.969-.41-1.998-.617-3.058-.617-1.073 0-2.145.213-3.101.617-.763.323-2.056 1.155-2.812 1.935l-.004-6.46h10.86c.395-.004.395-.556.395-.737 0-.182 0-.733-.396-.738h-11.743c-.32 0-.518.266-.518.512v9.101c0 .293.366.505.706.578.664.142.817-.07.979-.295l.022-.03c.248-.369 1.023-1.149 1.031-1.157 1.21-1.21 2.828-1.876 4.555-1.876 1.72 0 3.333.667 4.543 1.876 1.214 1.214 1.883 2.823 1.883 4.53 0 1.713-.666 3.322-1.874 4.53-1.192 1.193-2.858 1.876-4.57 1.876-1.16 0-2.279-.309-3.238-.894l.004-5.533c0-.738.32-1.54.857-2.146.613-.692 1.458-1.073 2.379-1.073.893 0 1.726.338 2.347.954.616.611.956 1.424.956 2.291 0 1.849-1.454 3.297-3.31 3.297-.358 0-1.008-.158-1.035-.165-.375-.112-.534.409-.586.58-.202.66.101.791.164.81.597.185.989.22 1.503.22 2.62 0 4.752-2.133 4.752-4.754 0-2.601-2.13-4.716-4.749-4.716-1.283 0-2.487.49-3.393 1.38-.862.848-1.356 1.978-1.356 3.101v.028c-.004.14-.007 3.457-.008 4.545-.493-.545-.984-1.385-1.307-2.238-.126-.334-.412-.275-.802-.155-.172.052-.69.212-.576.587zm5.584-1.296c.001.159.147.299.234.382l.027.026c.149.147.291.221.422.221.109 0 .175-.051.199-.073l.879-.886.829.826c.077.086.16.13.257.132.132 0 .276-.079.428-.233.357-.365.179-.562.092-.657l-.839-.84.875-.881c.192-.208.023-.429-.146-.598-.246-.246-.482-.309-.634-.169l-.871.872-.88-.881c-.047-.044-.105-.068-.17-.068-.117 0-.256.08-.413.236-.271.271-.329.458-.188.607l.88.877-.875.877c-.071.073-.107.15-.106.23zm1.919-11.898c-1.407 0-2.904.284-4.004.76-.118.046-.188.141-.204.273-.014.125.02.29.104.505.068.174.25.637.6.503 1.125-.429 2.37-.666 3.504-.666 1.285 0 2.53.251 3.703.747.932.395 1.811.964 2.767 1.792.07.061.144.091.22.091.187 0 .365-.183.518-.354.255-.286.431-.524.179-.762-.913-.865-1.913-1.511-3.148-2.033-1.343-.568-2.77-.856-4.239-.856zm7.582 17.377c-.169-.169-.313-.269-.44-.305-.128-.037-.243-.009-.331.079l-.083.083c-.872.872-1.888 1.557-3.019 2.035-1.17.495-2.414.746-3.696.746s-2.525-.251-3.696-.746c-1.131-.478-2.146-1.163-3.019-2.035-.909-.909-1.594-1.924-2.035-3.019-.431-1.067-.572-1.87-.618-2.133l-.01-.057c-.059-.311-.345-.332-.756-.27-.17.026-.69.106-.641.48l.001.008c.138.866.381 1.714.723 2.523.549 1.299 1.336 2.466 2.337 3.467s2.168 1.788 3.467 2.337c1.346.57 2.774.859 4.247.859 1.472 0 2.901-.289 4.247-.858 1.298-.549 2.465-1.336 3.467-2.338l.087-.089c.11-.12.206-.33-.232-.767z" />
    )}
  </svg>
);

FivehundredpxIcon.propTypes = {
  isDark: PropTypes.bool,
};

export default FivehundredpxIcon;