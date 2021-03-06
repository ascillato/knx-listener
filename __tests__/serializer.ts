import { write, read } from 'src/serializer';

describe('Knx Interfaces', () => {
  it('can write small data', () => {
    const a = Buffer.from([
      0x06, 0x10, 0x04, 0x20, 0x00,
      0x15, 0x04, 0x3f, 0x00, 0x00,
      0x11, 0x00, 0xbc, 0xe0, 0x00,
      0x00, 0x00, 0x04, 0x01, 0x00, 0x8F]);
    expect(write({
      channelId: 63,
      data: Buffer.from([0xF]),
      dest: 0x04,
      source: 0x00,
      seqn: 0,
    })).toEqual(a);
  });
  it('can write larger data', () => {
    const a = Buffer.from([
      0x06, 0x10, 0x04, 0x20, 0x00,
      0x17, 0x04, 0x3f, 0x02, 0x00, 0x11, 0x00, 0xbc,
      0xe0, 0x00, 0x04, 0x00, 0x02, 0x03, 0x00, 0x80, 0x0F, 0xFF]);
    expect(write({
      data: Buffer.from([0x0F, 0xFF]),
      dest: 0x02,
      source: 0x04,
      seqn: 2,
      channelId: 63,
    })).toEqual(a);
  })
  it('can read', () => {
    const a = Buffer.from([
      0x06, 0x10, 0x04, 0x20, 0x00, 0x15,
      0x04, 0x3f, 0x01, 0x00, 0x11, 0x00,
      0xbc, 0xe0, 0x00, 0x00, 0x00, 0x01,
      0x01, 0x00, 0x00,
    ]);
    expect(read({
      channelId: 63,
      dest: 0x01,
      source: 0x00,
      seqn: 1,
    })).toEqual(a);
  });
});
