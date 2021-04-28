import io

from PIL import Image
import struct

p = './src/assets/icons/favicon.256x256.png'

bi = Image.open(p)

print(bi)


def toInt(s):
    b = s.encode('ascii')
    return (b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3]


MAGIC = toInt("icns")
HEADER_SIZE = 8
TOC = 'TOC '
# 几种尺寸大小
sizes = [256]
size_str = ['ic07', 'ic08', 'ic09', 'ic11', 'ic12', 'ic13', 'ic14', 'ic10']
fileSize = 0
entries = []
for index, s in enumerate(sizes):
    temp = io.BytesIO()
    nb = bi.resize((s, s))
    nb.save(temp, 'png')
    fileSize += len(temp.getvalue())
    entries.append({
        'type': size_str[index],
        'size': len(temp.getvalue()),
        'stream': temp
    })

dos = io.BytesIO()
# Header
dos.write(struct.pack('i', MAGIC)[::-1])
dos.write(struct.pack('i', fileSize)[::-1])

# TOC
tocSize = HEADER_SIZE + (len(entries) * HEADER_SIZE)
dos.write(struct.pack('i', toInt(TOC))[::-1])
dos.write(struct.pack('i', tocSize)[::-1])
for e in entries:
    dos.write(struct.pack('i', toInt(e.get('type')))[::-1])
    dos.write(struct.pack('i', HEADER_SIZE + e.get('size'))[::-1])

# Data
for index, e in enumerate(entries):
    dos.write(struct.pack('i', toInt(e.get('type')))[::-1])
    dos.write(struct.pack('i', HEADER_SIZE + e.get('size'))[::-1])
    dos.write(e.get('stream').getvalue())

dos.flush()

print(len(dos.getvalue()))

pp = './src/assets/icons/favicon.icns'
ff = open(pp, 'wb')
ff.write(dos.getvalue())
ff.flush()
ff.close()
