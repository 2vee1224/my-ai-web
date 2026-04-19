import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  LinearProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import './App.css';

const navItems = ['About me', 'History', 'Skills', 'Project', 'Contect'];

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function Navigation() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="nav-bar"
      sx={{
        bgcolor: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid #eee',
        maxWidth: { xs: '100%', md: '1200px' },
        left: { xs: 0, md: '50%' },
        transform: { xs: 'none', md: 'translateX(-50%)' },
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Toolbar className="nav-toolbar" sx={{ justifyContent: 'center', gap: { xs: 0.5, md: 4 }, minHeight: '48px !important' }}>
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
            className="nav-button"
            sx={{
              color: '#333',
              fontFamily: '"Rubik", sans-serif',
              fontSize: { xs: '0.7rem', md: '1.15rem' },
              fontWeight: 500,
              fontStyle: 'italic',
              letterSpacing: '0.05em',
              py: 0.5,
              px: { xs: 0.5, md: 2 },
              minWidth: 'auto',
              '&:hover': { color: '#9B8BB4', bgcolor: 'transparent' },
            }}
          >
            {item}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

/**
 * Deco 컴포넌트 - 장식 이미지 (절대 위치, 모바일에서 숨김)
 */
function Deco({ src, sx, className }) {
  return (
    <Box
      component="img"
      src={`${import.meta.env.BASE_URL}${src}`}
      alt=""
      className={`deco-img${className ? ` ${className}` : ''}`}
      sx={{ position: 'absolute', pointerEvents: 'none', zIndex: 2, ...sx }}
    />
  );
}

/**
 * SectionTitle 컴포넌트
 */
function SectionTitle({ children, imageSrc }) {
  return (
    <Box sx={{ textAlign: 'center', mb: 2.5 }}>
      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}${imageSrc}`}
        alt={children}
        sx={{ height: { xs: '48px', md: '64px' }, objectFit: 'contain' }}
      />
    </Box>
  );
}

function AboutMe() {
  return (
    <Box id="about-me" className="page page-1" sx={{ position: 'relative' }}>
      {/* ABOUT ME 데코 - PC 전용 */}
      <Deco src="png_11.png" sx={{ left: '75px', top: '118px', width: '200px' }} className="deco-float-noshadow" />
      <Deco src="img_02.png" sx={{ right: '25px', top: '113px', width: '220px', transform: 'rotate(12deg)', opacity: 0.7 }} />
      <Deco src="png_16.png" sx={{ right: '65px', top: '220px', width: '150px', transform: 'rotate(-5deg)' }} className="deco-float-3" />
      <Deco src="png_17.png" sx={{ right: '15px', top: '212px', width: '140px', transform: 'rotate(2deg)' }} className="deco-float-2" />
      <Deco src="png_14.png" sx={{ right: '35px', top: '455px', width: '175px', transform: 'rotate(12deg)' }} className="deco-float-2" />
      <Deco src="png_8.png"  sx={{ right: '-5px', top: '565px', width: '210px', transform: 'rotate(10deg)' }} />
      <Deco src="png_13.png" sx={{ left: '40px', bottom: '-15px', width: '160px', transform: 'rotate(-3deg)' }} className="deco-float-3" />

      <Box className="page-inner" sx={{ pt: '56px' }}>
        <Container maxWidth="lg">
          <SectionTitle imageSrc="title_1.png">About Me</SectionTitle>

          {/* Profile area */}
          <Box sx={{
            width: { xs: '100%', md: '950px' },
            mx: 'auto',
            position: 'relative',
            mb: 3,
            display: { xs: 'flex', md: 'block' },
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
            {/* 흰색 카드 */}
            <Box sx={{
              order: { xs: 2, md: 0 },
              ml: { xs: 0, md: '150px' },
              width: { xs: '100%', md: '800px' },
              height: { xs: 'auto', md: '400px' },
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(156,139,180,0.15)',
              border: '1px solid #E8E0F0',
              pl: { xs: '24px', md: '170px' },
              pr: '28px',
              py: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}>
              {/* 이름 */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  임여진 <Typography component="span" sx={{ fontWeight: 400, color: '#888' }}>/ Limyeojin</Typography>
                </Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>
                  1997 . 12 . 24
                </Typography>
              </Box>

              {/* 소개 */}
              <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#555', textAlign: 'center', mb: 1.5, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                추구미는 여리여리함🎀이지만 그렇지 못한편
                <br />
                비전공자 출신으로 뒤늦게 처음부터 새로 시작했지만
                <br />
                미래의 <strong>웹디자이너</strong>가 될 사람 😋
              </Typography>

              {/* 성격 */}
              <Box className="personality-columns" sx={{ mb: 1.5 }}>
                {[
                  ['호기심많은 예술가', 'ISFP'],
                  ['낯을 좀 가리지만 친해지면', '재밌고 배려심 넘치는 성격'],
                  ['ISFP 치고 꽤나', '성실✊한편'],
                  ['일할때 튀어나오는', 'TJ 모먼트'],
                ].map(([left, right], i) => (
                  <Box key={i} className="personality-pair">
                    <Typography component="span" variant="body2" className="p-left" sx={{ lineHeight: 2, color: '#555', fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {left}
                    </Typography>
                    <Typography component="span" variant="body2" className="p-right" sx={{ lineHeight: 2, color: '#9B8BB4', fontWeight: 500, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                      {right}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* 배지 */}
              <Box sx={{ textAlign: 'center' }}>
                <Box component="span" sx={{
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  backgroundColor: '#cfd5e3',
                  borderRadius: '6px',
                  padding: '5px 16px',
                  display: 'inline',
                  lineHeight: 2.2,
                }}>
                  빠르고 계획적으로 일처리하는 능력자✌
                </Box>
              </Box>
            </Box>

            {/* 프로필 원형 사진 */}
            <Box sx={{
              order: { xs: 1, md: 0 },
              position: { xs: 'relative', md: 'absolute' },
              left: { xs: 'auto', md: 0 },
              top: { xs: 'auto', md: '50%' },
              transform: { xs: 'none', md: 'translateY(-50%)' },
              width: { xs: '160px', md: '300px' },
              height: { xs: '160px', md: '300px' },
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #B8A9C9',
              zIndex: 1,
              boxShadow: '0 4px 20px rgba(156,139,180,0.2)',
              backgroundColor: '#E8E0F0',
            }}>
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt="프로필 사진"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                  display: 'block',
                }}
              />
            </Box>
          </Box>

          {/* My Favorites */}
          <Box sx={{ mt: { xs: 3, md: 6 }, width: { xs: '100%', md: '1000px' }, mx: 'auto' }}>
            {/* 타이틀 + 테이프 */}
            <Box sx={{ position: 'relative', display: 'inline-block', mb: '-16px', zIndex: 2 }}>
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}img_05.png`}
                alt=""
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  top: '50%',
                  left: '-50px',
                  width: 'calc(100% + 100px)',
                  height: '104px',
                  objectFit: 'fill',
                  transform: 'translateY(-50%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                  opacity: 0.7,
                }}
              />
              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}title_6.png`}
                alt="MY FAVORITES"
                sx={{ height: { xs: '36px', md: '44px' }, objectFit: 'contain', display: 'block', position: 'relative', zIndex: 1 }}
              />
            </Box>
            {/* 흰색 카드 래퍼 */}
            <Box sx={{ position: 'relative', width: { xs: '100%', md: '1000px' }, zIndex: 1 }}>
              <Box sx={{
                width: { xs: '100%', md: '1000px' },
                height: { xs: 'auto', md: '400px' },
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(156,139,180,0.15)',
                border: '1px solid #E8E0F0',
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: { xs: 'stretch', md: 'flex-start' },
                justifyContent: 'space-evenly',
                pt: { xs: 2, md: 4 },
                pb: { xs: 2, md: 0 },
                px: { xs: 1, md: 0 },
                gap: { xs: 1, md: 0 },
              }}>
                {[
                  { banner: 'banner_1.png', title: 'GAME', desc: '친구들과 게임하거나\n유튜브로 게임영상 보는걸\n좋아해요! 🎮' },
                  { banner: 'banner_3.png', title: 'MOVIES', desc: '쉬는날 집에서 혼자\n영화보는걸 좋아해요!\n최애영화는 트와일라잇 시리즈💗' },
                  { banner: 'banner_4.png', title: 'TRAVEL', desc: '국내든 해외든 여행다니는걸\n좋아해요! ✈️' },
                ].map((item) => (
                  <Box key={item.title} sx={{
                    flex: { xs: 1, md: 'none' },
                    width: { xs: 'auto', md: '200px' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <Box sx={{ position: 'relative', width: '100%' }}>
                      <Box
                        component="img"
                        src={`${import.meta.env.BASE_URL}${item.banner}`}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: { xs: '130px', md: '250px' },
                          objectFit: 'cover',
                          borderRadius: '8px',
                          display: 'block',
                          boxShadow: '0 0 0 5px #E8E0F0',
                        }}
                      />
                      {item.title === 'GAME' && (
                        <Deco src="png_2.png" sx={{ right: '-25px', top: '-25px', width: '110px', transform: 'rotate(10deg)' }} />
                      )}
                    </Box>
                    <Box sx={{ pt: 1, pb: 0.5, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3, fontFamily: '"Playfair Display", serif', color: '#5C4B7A', fontSize: { xs: '0.72rem', md: '0.875rem' } }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666', whiteSpace: 'pre-line', lineHeight: 1.5, display: 'block', fontSize: { xs: '0.62rem', md: '0.75rem' } }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function HistoryAndSkills() {
  const leftItems = [
    { title: '송원대학교 뷰티예술학과 16학번', detail: '( 2016.03~2020.02 졸업)' },
    { title: '국제수영연맹 [FINA] 에서\n메이크업아티스트로써 특수분장 자원봉사', detail: '(2019.07)' },
    { title: '아모레퍼시픽 특약점에서\n교육매니저(대리)로 근무', detail: '(2020.11~2025.04) 4년6개월' },
  ];
  const rightItems = [
    { title: '뷰티코디네이터', detail: '2017.04 CSM 아카데미 평생교육원' },
    { title: '병원코디네이터', detail: '2017.04 CSM 아카데미 평생교육원' },
    { title: '미용사 (메이크업)', detail: '2019.02 한국산업인력공단' },
    { title: '2종보통운전면허', detail: '2019.12 경찰청' },
    { title: '웹디자인개발기능사', detail: '2026.04 한국산업인력공단' },
    { title: '컴퓨터그래픽기능사', detail: '2026.04 한국산업인력공단' },
  ];

  const skills = [
    { name: 'PowerPoint', abbr: 'P', color: '#D04423', level: 90 },
    { name: 'Photoshop', abbr: 'Ps', color: '#31A8FF', level: 70 },
    { name: 'Excel', abbr: 'X', color: '#217346', level: 90 },
    { name: 'Illustrator', abbr: 'Ai', color: '#FF9A00', level: 70 },
    { name: 'Word', abbr: 'W', color: '#2B579A', level: 100 },
    { name: 'VS Code', abbr: 'VS', color: '#007ACC', level: 70 },
    { name: 'Git', abbr: 'G', color: '#F05032', level: 60 },
    { name: 'Ai', abbr: 'Ai', color: '#CC785C', level: 80 },
  ];

  return (
    <>
      {/* History */}
      <Box id="history" sx={{
        height: { xs: 'auto', md: '750px' },
        py: { xs: 5, md: 0 },
        scrollSnapAlign: 'start',
        position: 'relative',
        overflow: { xs: 'visible', md: 'hidden' },
        background: 'white',
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
      }}>
        <Deco src="img_06.png" sx={{ left: '30px', top: '40px', width: '220px', transform: 'rotate(-5deg)' }} />
        <Deco src="png_10.png" sx={{ left: '110px', top: '40px', width: '160px', transform: 'rotate(-10deg)' }} className="deco-float-4" />
        <Deco src="img_16.png" sx={{ left: '30px', bottom: '28px', width: '200px', transform: 'rotate(-8deg)' }} />
        <Deco src="png_7.png"  sx={{ left: '0px', bottom: '30px', width: '165px', transform: 'rotate(-5deg)' }} />
        <Deco src="img_08.png" sx={{ right: '30px', top: '30px', width: '260px', transform: 'rotate(12deg)' }} />
        <Deco src="img_13.png" sx={{ right: '35px', bottom: '68px', width: '210px', transform: 'rotate(-5deg)' }} />
        <Deco src="png_1.png"  sx={{ right: '5px', bottom: '63px', width: '160px', transform: 'rotate(10deg)' }} className="deco-float-2" />
        <Container maxWidth="md">
          <SectionTitle imageSrc="title_2.png">History</SectionTitle>
          <Box className="timeline-container">
            <Box className="timeline-line" />
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box className="timeline-side timeline-left">
                  {leftItems.map((item, i) => (
                    <Box key={i} className="timeline-item">
                      <Box className="timeline-dot" />
                      <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'pre-line', fontSize: '0.8rem' }}>
                        {item.title}
                      </Typography>
                      {item.detail && (
                        <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 0.5 }}>
                          {item.detail}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box className="timeline-side timeline-right">
                  {rightItems.map((item, i) => (
                    <Box key={i} className="timeline-item">
                      <Box className="timeline-dot" />
                      <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'pre-line', fontSize: '0.8rem' }}>
                        {item.title}
                      </Typography>
                      {item.detail && (
                        <Typography variant="caption" sx={{ color: '#888', display: 'block', mt: 0.5 }}>
                          {item.detail}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Skills */}
      <Box id="skills" sx={{
        height: { xs: 'auto', md: '500px' },
        py: { xs: 5, md: 0 },
        scrollSnapAlign: 'start',
        position: 'relative',
        overflow: { xs: 'visible', md: 'hidden' },
        background: 'linear-gradient(180deg, #F0EDF7 0%, #E8E0F0 100%)',
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
      }}>
        <Deco src="png_9.png" sx={{ left: '120px', top: '75px', width: '165px', transform: 'rotate(-10deg)', zIndex: 10 }} />
        <Container maxWidth="md">
          <SectionTitle imageSrc="title_3.png">Skills</SectionTitle>
          <Box className="skills-card" sx={{ position: 'relative', py: '28px' }}>
            <Deco src="img_21.png" sx={{ right: '-92px', top: '-65px', width: '205px', transform: 'rotate(8deg)', opacity: 0.75, mixBlendMode: 'multiply' }} />
            <Deco src="png_12.png" sx={{ right: '-148px', top: '-90px', width: '190px', transform: 'rotate(8deg)' }} className="deco-float-3" />
            <Grid container spacing={2}>
              {skills.map((skill) => (
                <Grid size={{ xs: 6, sm: 6 }} key={skill.name}>
                  <Box className="skill-row">
                    <Box className="skill-icon" sx={{ bgcolor: skill.color, color: 'white' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.7rem' }}>
                        {skill.abbr}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <FavoriteIcon sx={{ fontSize: 14, color: '#E8B4C8' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                          {skill.name}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#E8E0F0',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            bgcolor: '#B8A9C9',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

function ProjectAndContact() {
  const projects = [
    {
      title: '공차 카페 홈페이지 리디자인',
      tool: '사용툴 : Ps, Ai, VS Code, Claude Ai',
      detail: '기여도 100%\n기획 3일 / 작업 4주 소요',
      url: 'https://2vee1224.github.io/gongcha-redesign/',
      previewBg: 'linear-gradient(135deg, #8B0000, #c30e2e)',
      previewIcon: <LocalCafeIcon sx={{ fontSize: 40, color: '#fff' }} />,
      previewLabel: 'Gong Cha',
    },
    {
      title: '자스민벨 쇼핑몰 홈페이지 리디자인',
      tool: '사용툴 : Ps, VS Code, Claude Ai',
      detail: '기여도 100%\n기획 3일 / 작업 4주 소요',
      url: 'https://2vee1224.github.io/jasminbell-redesign/',
      previewBg: 'linear-gradient(135deg, #ffcdd2, #f8bbd0)',
      previewIcon: <LocalMallIcon sx={{ fontSize: 40, color: '#fff' }} />,
      previewLabel: 'Jasminbell',
    },
    {
      title: 'Game Hub - 게임 커뮤니티',
      tool: '사용툴 : VS Code, Claude Ai',
      detail: '기여도 100%\n기획 1일 / 작업 1일 소요',
      url: 'https://2vee1224.github.io/my-ai-web/lecture1/',
      previewBg: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      previewIcon: <SportsEsportsIcon sx={{ fontSize: 40, color: '#4ECDC4' }} />,
      previewLabel: 'Game Hub',
    },
    {
      title: 'Travel Log - 여행 SNS',
      tool: '사용툴 : VS Code, Claude Ai',
      detail: '기여도 100%\n기획 1일 / 작업 1일 소요',
      url: 'https://2vee1224.github.io/my-ai-web/lecture1/mini_sns/',
      previewBg: 'linear-gradient(135deg, #87CEEB, #98FB98)',
      previewIcon: <FlightTakeoffIcon sx={{ fontSize: 40, color: '#fff' }} />,
      previewLabel: 'Travel Log',
    },
  ];

  return (
    <Box id="project" className="page page-3" sx={{ position: 'relative' }}>
      {/* PROJECT 데코 */}
      <Deco src="img_03.png" sx={{ right: '15px', top: '42%', width: '170px', transform: 'rotate(-8deg)' }} />
      <Deco src="png_5.png"  sx={{ right: '80px', top: '45%', width: '125px', transform: 'rotate(10deg)' }} className="deco-float-4" />
      <Deco src="img_04.png" sx={{ left: '0px', bottom: '162px', width: '165px', transform: 'rotate(8deg)' }} />
      <Deco src="png_15.png" sx={{ left: '68px', bottom: '188px', width: '110px', transform: 'rotate(5deg)' }} className="deco-float-4" />

      {/* Project */}
      <Box className="page-3-project">
        <Container maxWidth="md">
          <SectionTitle imageSrc="title_4.png">Project</SectionTitle>
          <Box sx={{ mb: 3 }} />
          <Grid container spacing={{ xs: 1.5, md: 3 }} alignItems="stretch">
            {projects.map((project, i) => (
              <Grid size={{ xs: 6, sm: 6 }} key={i} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    borderRadius: '12px',
                    border: '1px solid #E8E0F0',
                    background: '#FDFCFE',
                    overflow: 'visible',
                    position: 'relative',
                    transition: 'box-shadow 0.3s',
                    width: '100%',
                    height: '100%',
                    cursor: project.url ? 'pointer' : 'default',
                    '&:hover': { boxShadow: '0 4px 16px rgba(156,139,180,0.15)' },
                  }}
                  onClick={() => project.url && window.open(project.url, '_blank')}
                >
                  {i === 0 && <Deco src="png_4.png" sx={{ left: '-60px', top: '-80px', width: '150px', transform: 'rotate(-12deg)' }} />}
                  {/* 미리보기 */}
                  <Box sx={{
                    width: '100%',
                    height: { xs: 80, md: 130 },
                    background: project.previewImg ? 'none' : (project.previewBg || 'linear-gradient(135deg, #E8E0F0, #D0C4E0)'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                    borderRadius: '12px 12px 0 0',
                    overflow: 'hidden',
                  }}>
                    {project.previewImg ? (
                      <Box
                        component="img"
                        src={`${import.meta.env.BASE_URL}${project.previewImg}`}
                        alt={project.title}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : project.previewIcon ? (
                      <>
                        {project.previewIcon}
                        <Typography sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>
                          {project.previewLabel}
                        </Typography>
                      </>
                    ) : (
                      <Typography sx={{ color: '#ccc', fontSize: '0.8rem' }}>Preview</Typography>
                    )}
                  </Box>

                  {/* 정보 */}
                  <Box sx={{ p: { xs: 1, md: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.72rem', md: '1rem' } }}>
                        {project.title}
                      </Typography>
                      {project.url && <OpenInNewIcon sx={{ fontSize: { xs: 11, md: 14 }, color: '#B8A9C9' }} />}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#888', fontSize: { xs: '0.65rem', md: '0.875rem' } }}>
                      {project.tool}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999', whiteSpace: 'pre-line', mt: 0.5, display: 'block', fontSize: { xs: '0.6rem', md: '0.75rem' } }}>
                      {project.detail}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contect */}
      <Box id="contect" className="page-3-contact">
        <Container maxWidth="md">
          <SectionTitle imageSrc="title_5.png">Contect</SectionTitle>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: 'white',
              px: { xs: 4, md: 8 },
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(156,139,180,0.15)',
            }}>
              <Deco src="png_3.png" sx={{ left: '-80px', top: '-90px', width: '180px', transform: 'rotate(-12deg)' }} />
              <Deco src="png_6.png" sx={{ right: '-80px', top: '-90px', width: '170px', transform: 'rotate(12deg)' }} />
              <EmailIcon sx={{ color: '#9B8BB4' }} />
              <Typography variant="body2" sx={{ color: '#555' }}>
                wlsdlgnsdl97@naver.com
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Box>
      <Navigation />
      <AboutMe />
      <HistoryAndSkills />
      <ProjectAndContact />
    </Box>
  );
}

export default App;
