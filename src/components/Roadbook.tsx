import './Roadbook.css'

interface RoadbookProps {
  isDarkMode: boolean
}

const Roadbook = ({ isDarkMode }: RoadbookProps) => {
  const roadbooks = [
    {
      id: 1,
      title: '川藏线自驾之旅',
      cover: '🏔️',
      distance: '2,142 km',
      duration: '15天',
      highlights: ['稻城亚丁', '然乌湖', '布达拉宫'],
      createdAt: '2026-03-01'
    },
    {
      id: 2,
      title: '海南环岛游',
      cover: '🏝️',
      distance: '612 km',
      duration: '7天',
      highlights: ['三亚湾', '蜈支洲岛', '天涯海角'],
      createdAt: '2026-02-15'
    },
    {
      id: 3,
      title: '大西北环线',
      cover: '🏜️',
      distance: '3,000 km',
      duration: '10天',
      highlights: ['茶卡盐湖', '敦煌莫高窟', '青海湖'],
      createdAt: '2026-01-20'
    }
  ]

  return (
    <div className="roadbook-container">
      <div className="roadbook-header">
        <h1>🗺️ 我的路书</h1>
        <button className="create-roadbook-btn">+ 创建新路书</button>
      </div>

      <div className="roadbook-stats">
        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-info">
            <div className="stat-value">{roadbooks.length}</div>
            <div className="stat-label">路书数量</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <div className="stat-value">5,754</div>
            <div className="stat-label">总里程 (km)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <div className="stat-value">32</div>
            <div className="stat-label">总天数</div>
          </div>
        </div>
      </div>

      <div className="roadbook-list">
        {roadbooks.map(book => (
          <div key={book.id} className="roadbook-card">
            <div className="roadbook-cover">{book.cover}</div>
            <div className="roadbook-content">
              <h3>{book.title}</h3>
              <div className="roadbook-meta">
                <span>📏 {book.distance}</span>
                <span>⏰ {book.duration}</span>
              </div>
              <div className="roadbook-highlights">
                {book.highlights.map((highlight, idx) => (
                  <span key={idx} className="highlight-tag">{highlight}</span>
                ))}
              </div>
              <div className="roadbook-footer">
                <span className="created-date">创建于 {book.createdAt}</span>
                <div className="roadbook-actions">
                  <button className="action-btn">📝 编辑</button>
                  <button className="action-btn">🚀 开始导航</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Roadbook
